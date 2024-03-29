import React, { useEffect, useRef, useState } from 'react';
import { Alert, Keyboard, ScrollView, View } from 'react-native';
import Header from '../../components/header/Header';
import Post from '../../components/post/Post';
import * as Color from '../../config/color/Color';
import * as Typo from '../../components/typography/Typography';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../stacks/mainStack/MainStack';
import { SlideModal } from '../../components/modal/Modal';
import { BasicButton, SendButton } from '../../components/button/Buttons';
import { Spacer } from '../../components/basic/Spacer';
import { getPostDetail } from '../../apis/services/community/community';
import { changeCategoryName } from '../../util/MarketUtil';
import { Comment } from '../../components/comment/Comment';
import styled from 'styled-components';
import { widthPercent } from '../../config/dimension/Dimension';
import { SingleLineInputBox } from '../../components/inputBox/Input';

interface DetaliPostProps {
  route: {
    params: {
      id: number;
    };
  };
}

const Container = styled.View`
  flex: 1;
  background-color: ${Color.WHITE};
`;

const ButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 auto;
  column-gap: ${widthPercent * 4}px;
  /* border: 1px; */
`;

const DetailPostScreen = (props: DetaliPostProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [modalVisible, setModalVisible] = useState(false);
  const [commentData, setCommentData] = useState<Array<any>>([]);
  const [selectId, setSelectId] = useState(0);
  const [commentContent, setCommentContent] = useState<string>('');

  const textInputRef = useRef<any>(null);
  const focusOnInput = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  };

  const onSubmitComment = () => {
    Keyboard.dismiss();
    focusOnInput();
  };

  const [postData, setPostData] = useState<{
    user: {
      nickname: string;
      profileImage: string;
      userId: number;
    };
    communityId: number;
    communityContent: string;
    cate: string;
    isLiked: boolean;
    likeCount: number;
    commentCount: number;
    createdAt: string;
    image1?: string;
    image2?: string;
    image3?: string;
    image4?: string;
  }>({
    user: {
      nickname: '',
      profileImage: '',
      userId: 0,
    },
    communityId: 0,
    communityContent: '',
    cate: '',
    isLiked: false,
    likeCount: 0,
    commentCount: 0,
    createdAt: '',
    image1: '',
    image2: '',
    image3: '',
    image4: '',
  });

  useEffect(() => {
    const getDetail = async () => {
      const response = await getPostDetail({ communityId: props.route.params.id });
      setPostData(response.dataBody);
    };

    getDetail();
  }, []);
  console.log(selectId);

  useEffect(() => {
    if (postData.communityId != 0) {
      setCommentData([
        {
          id: 3,
          userId: 1,
          name: 'test1',
          date: '2023-12-24 13:28:12',
          content: 'comment 3',
          group: 0,
          profileImg_url: null,
          recomment: [],
        },
        {
          id: 2,
          userId: 2,
          name: 'test1',
          date: '2023-12-24 13:28:12',
          content: 'comment 3',
          group: 0,
          profileImg_url: null,
          recomment: [
            {
              id: 8,
              userId: 2,
              name: 'test1',
              date: '2023-12-24 13:28:47',
              content: 're comment 2-2',
              group: 2,
              profileImg_url: null,
            },
            {
              id: 7,
              userId: 1,
              name: 'test1',
              date: '2023-12-24 13:28:45',
              content: 're comment 2-1',
              group: 2,
              profileImg_url: null,
            },
          ],
        },
      ]);
    }
  }, [postData]);

  return (
    <Container>
      <ScrollView style={{ flex: 1, backgroundColor: Color.WHITE }}>
        <Header type={'default'} firstIcon='back' secondIcon={'more'} onPressMore={() => setModalVisible(true)} />
        <Post
          onPress={() => console.log('')}
          postData={{
            name: postData.user.nickname,
            date: postData.createdAt,
            classification: changeCategoryName(postData.cate),
            content: postData.communityContent,
            likeNumber: postData.likeCount,
            commentNumber: postData.commentCount,
            profileImg: postData.user.profileImage,
            imgUrl_one: postData.image1,
            imgUrl_two: postData.image2,
            imgUrl_three: postData.image3,
            imgUrl_four: postData.image4,
          }}
        />
        {commentData.length !== 0 &&
          commentData.map((item) => <Comment key={item.commentId} data={item} setSelectId={setSelectId} focusOnInput={focusOnInput} selectId={selectId} />)}

        <SlideModal isVisible={modalVisible} setIsVisible={setModalVisible}>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <BasicButton
              onPress={() => {
                console.log('수정 페이지로 이동');
                // navigation.navigate('UpdatePostScreen', { postData });
                setModalVisible(false);
              }}
              width={300}
              height={50}
              backgroundColor={Color.WHITE}
              borderColor={Color.GRAY500}
              borderRadius={10}
            >
              <Typo.BODY3_M color={Color.GREEN500}>수정하기</Typo.BODY3_M>
            </BasicButton>
            <Spacer space={12} />
            <BasicButton
              onPress={() => {
                Alert.alert('삭제', '정말 삭제하시겠습니까?', [
                  { text: '아니오', onPress: () => setModalVisible(false), style: 'cancel' },
                  { text: '예', onPress: () => console.log('삭제 로직 실행'), style: 'destructive' },
                ]);
                setModalVisible(false);
              }}
              width={300}
              height={50}
              backgroundColor={Color.GREEN500}
              borderColor={Color.GRAY500}
              borderRadius={10}
            >
              <Typo.BODY3_M color={Color.WHITE}>삭제하기</Typo.BODY3_M>
            </BasicButton>
          </View>
        </SlideModal>
      </ScrollView>
      <ButtonContainer>
        <SingleLineInputBox
          refInput={textInputRef}
          width={300}
          placeholder={selectId === 0 ? '댓글을 입력하세요' : '대댓글을 입력하세요'}
          value={commentContent}
          onChangeText={setCommentContent}
          onBlur={() => {
            setSelectId(0);
            setCommentContent('');
          }}
        />
        <SendButton onPress={onSubmitComment} />
      </ButtonContainer>
    </Container>
  );
};

export default DetailPostScreen;
