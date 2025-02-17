import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, BackHandler, ScrollView, View } from 'react-native';
import styled from 'styled-components/native';
import { Spacer } from '../../components/basic/Spacer';
import { BasicButton } from '../../components/button/Buttons';
import CustomRadioButton from '../../components/cutomRadioButton/CutomRadioButton';
import Header from '../../components/header/Header';
import ImgUploader from '../../components/imgUploader/ImgUploader';
import { MultiLineInputBox } from '../../components/inputBox/Input';
import * as Typo from '../../components/typography/Typography';
import * as Color from '../../config/color/Color';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../stacks/mainStack/MainStack';
import { getKST, uploadImagesToFirebaseStorage } from '../../util/BasicUtil';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../recoil/atoms/userInfoState';
import { registPost } from '../../apis/services/community/community';
import { UpLoadingModule } from '../../modules/marketModules/MarketModules';

const Container = styled.View`
  margin-left: ${20 * widthPercent}px;
  margin-right: ${20 * widthPercent}px;
  margin-bottom: ${20 * heightPercent}px;
  row-gap: ${5 * heightPercent}px;
`;

interface CreatePostProps {
  route: {
    params: {
      cate?: string;
    };
  };
}

const CreatePostScreen = (props: CreatePostProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const userInfo = useRecoilValue(userInfoState);

  const [activeIndex, setActiveIndex] = useState(0);
  const [category, setCategory] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [imgUrls, setImgeUrls] = useState<string[]>([]);

  const [isUploading, setIsUploading] = useState<boolean>(false);

  const radioData = [
    {
      content: '자유',
      event: () => {
        setActiveIndex(0);
        setCategory('FREEDOM');
      },
      active: activeIndex === 0,
    },
    {
      content: '꿀팁',
      event: () => {
        setActiveIndex(1);
        setCategory('TIP');
      },
      active: activeIndex === 1,
    },
    {
      content: '나눔',
      event: () => {
        setActiveIndex(2);
        setCategory('SHARE');
      },
      active: activeIndex === 2,
    },
    {
      content: '질문',
      event: () => {
        setActiveIndex(3);
        setCategory('QUESTION');
      },
      active: activeIndex === 3,
    },
  ];

  useEffect(() => {
    setCategory(props.route.params.cate ? props.route.params.cate : 'FREEDOM');
    if (props.route.params.cate === 'FREEDOM') {
      setActiveIndex(0);
    } else if (props.route.params.cate === 'TIP') {
      setActiveIndex(1);
    } else if (props.route.params.cate === 'SHARE') {
      setActiveIndex(2);
    } else if (props.route.params.cate === 'QUESTION') {
      setActiveIndex(3);
    }

    // const backAction = () => {
    //   // 뒤로가기 버튼을 눌렀을 때 수행할 작업들
    //   navigation.reset({ routes: [{ name: 'BottomNavigation' }] });
    //   return true; // true 반환 시 기본 동작 방지
    // };

    // const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    // return () => backHandler.remove();
  }, [props.route.params.cate]);

  const onSubmit = async () => {
    // back으로 보내는 API 코드 작성
    // try시 navigation.goBack()
    if (!content) {
      Alert.alert('수확행', '내용을 입력해주세요');
      return;
    }

    setIsUploading(true);
    const newImageUrls = await uploadImagesToFirebaseStorage(imgUrls, `커뮤니티//${userInfo.userId}//${getKST()}`);

    const params = {
      cate: category,
      content: content,
      image1: newImageUrls[0],
      image2: newImageUrls[1],
      image3: newImageUrls[2],
      image4: newImageUrls[3],
    };

    const response = await registPost(params);
    if (response.dataHeader.successCode === 0) {
      Alert.alert('수확행', '등록 완료!');
    } else {
      Alert.alert('수확행', '등록 실패');
    }
    setActiveIndex(0);
    setCategory('');
    setContent('');
    setImgeUrls([]);
    setIsUploading(false);
    navigation.reset({ routes: [{ name: 'BottomNavigation' }] });
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.WHITE }}>
      <Header
        type={'default'}
        onPressFirstIcon={() => {
          navigation.reset({ routes: [{ name: 'BottomNavigation' }] });
        }}
        firstIcon='back'
        title={'게시글 등록'}
      />
      {!isUploading ? (
        <>
          <ScrollView style={{ flex: 1, backgroundColor: Color.WHITE }}>
            <Spacer space={20} />
            <Container>
              <Typo.BODY4_M>분류 선택</Typo.BODY4_M>
              <View style={{ alignItems: 'center' }}>
                <CustomRadioButton data={radioData} width={60} />
              </View>
            </Container>
            <Container>
              <Typo.BODY4_M>내용</Typo.BODY4_M>
              <MultiLineInputBox value={content} onChangeText={setContent} placeholder={'내용을 작성하세요'} />
            </Container>
            <Container>
              <Typo.BODY4_M>사진</Typo.BODY4_M>
              <ImgUploader data={imgUrls} setData={setImgeUrls}></ImgUploader>
            </Container>
          </ScrollView>
          <Container>
            <BasicButton borderColor={Color.GREEN500} borderRadius={10} height={45} onPress={onSubmit}>
              <Typo.BODY3_M color={Color.WHITE}>작성완료</Typo.BODY3_M>
            </BasicButton>
          </Container>
        </>
      ) : (
        <UpLoadingModule text='등록 중입니다' />
      )}
    </View>
  );
};

export default CreatePostScreen;
