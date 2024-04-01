import React, { useEffect, useRef, useState } from 'react';
import { Alert, Keyboard, ScrollView, View } from 'react-native';
import Header from '../../components/header/Header';
import Post from '../../components/post/Post';
import * as Color from '../../config/color/Color';
import * as Typo from '../../components/typography/Typography';
import { NavigationProp, useIsFocused, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../stacks/mainStack/MainStack';
import { SlideModal } from '../../components/modal/Modal';
import { BasicButton, SendButton } from '../../components/button/Buttons';
import { Spacer } from '../../components/basic/Spacer';
import { deleteIsLiked, deletePost, getComment, getPostDetail, registComment, updateIsLiked } from '../../apis/services/community/community';
import { changeCategoryName } from '../../util/MarketUtil';
import { Comment } from '../../components/comment/Comment';
import styled from 'styled-components/native';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { SingleLineInputBox } from '../../components/inputBox/Input';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../recoil/atoms/userInfoState';

interface DetaliPostProps {
  route: {
    params: {
      id: number;
    };
  };
}

interface CommentType {
  comment: {
    user: {
      userId: number;
      nickname: string;
      profileImage: string;
    };
    commentId: number;
    createdAt: string;
    content: string;
  };
  recomment: [
    {
      user: {
        userId: number;
        nickname: string;
        profileImage: string;
      };
      commentId: number;
      createdAt: string;
      content: string;
    },
  ];
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
  const userInfo = useRecoilValue(userInfoState);
  const [modalVisible, setModalVisible] = useState(false);
  const [commentData, setCommentData] = useState<Array<CommentType> | null>(null);
  const [selectId, setSelectId] = useState(0);
  const [commentContent, setCommentContent] = useState<string>('');
  const isFocused = useIsFocused();

  const textInputRef = useRef<any>(null);
  const focusOnInput = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
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

  const onSubmitComment = async () => {
    if (postData.communityId != 0 && commentContent != '') {
      await registComment(props.route.params.id, { parentId: selectId, content: commentContent });
      const response = await getComment({ communityId: props.route.params.id });
      setCommentData(response.dataBody);
      setSelectId(0);
      Keyboard.dismiss();
    } else {
      Alert.alert('댓글/대댓글을 입력해주세요.');
    }
  };

  useEffect(() => {
    const getDetail = async () => {
      const response = await getPostDetail({ communityId: props.route.params.id });
      setPostData(response.dataBody);
    };

    getDetail();
  }, [props.route.params.id, isFocused]);

  useEffect(() => {
    const getCommentList = async () => {
      if (postData.communityId != 0 && props.route.params.id != 0) {
        const response = await getComment({ communityId: props.route.params.id });
        setCommentData(response.dataBody);
      }
    };
    getCommentList();
  }, [postData.communityId, props.route.params.id]);

  // 좋아요 처리
  const toggleIsLike = async () => {
    if (!postData.isLiked) {
      setPostData({ ...postData, isLiked: true, likeCount: postData.likeCount + 1 });
      await updateIsLiked({ communityId: props.route.params.id });
    } else {
      setPostData({ ...postData, isLiked: false, likeCount: postData.likeCount - 1 });
      await deleteIsLiked({ communityId: props.route.params.id });
    }
  };

  // 더보기 버튼 눌렀을 때
  const onPressMore = () => {
    if (userInfo.userId == String(postData.user.userId)) {
      setModalVisible(true);
    }
  };

  // 글 삭제 버튼 눌렀을 때
  const onPressDelete = async () => {
    await deletePost({ communityId: props.route.params.id });
    navigation.goBack();
  };

  // 글 수정 버튼 눌렀을 때
  const onPressModify = async () => {
    setModalVisible(false);
    navigation.navigate('UpdatePostScreen', { id: props.route.params.id });
  };

  // 댓글 목록 가져오기
  const getNewComment = async () => {
    const response = await getComment({ communityId: props.route.params.id });
    setCommentData(response.dataBody);
  };

  return (
    <Container>
      <ScrollView style={{ flex: 1, backgroundColor: Color.WHITE }}>
        <Header type={'default'} firstIcon='back' secondIcon={userInfo.userId == String(postData.user.userId) ? 'more' : ''} onPressMore={onPressMore} />
        <Post
          onPress={() => {}}
          onPressLikeButton={toggleIsLike}
          postData={{
            name: postData.user.nickname,
            date: postData.createdAt,
            classification: changeCategoryName(postData.cate),
            content: postData.communityContent,
            isLiked: postData.isLiked,
            likeNumber: postData.likeCount,
            commentNumber: postData.commentCount,
            profileImg: postData.user.profileImage,
            imgUrl_one: postData.image1,
            imgUrl_two: postData.image2,
            imgUrl_three: postData.image3,
            imgUrl_four: postData.image4,
          }}
        />
        <View style={{ paddingHorizontal: widthPercent * 20, paddingVertical: heightPercent * 10 }}>
          {commentData !== null &&
            commentData.map((item) => (
              <Comment
                key={item.comment.commentId}
                communityId={props.route.params.id}
                data={item}
                setSelectId={setSelectId}
                focusOnInput={focusOnInput}
                selectId={selectId}
                getNewComment={getNewComment}
              />
            ))}
        </View>
        <SlideModal isVisible={modalVisible} setIsVisible={setModalVisible}>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <BasicButton onPress={onPressModify} width={300} height={50} backgroundColor={Color.WHITE} borderColor={Color.GRAY500} borderRadius={10}>
              <Typo.BODY3_M color={Color.GREEN500}>수정하기</Typo.BODY3_M>
            </BasicButton>
            <Spacer space={12} />
            <BasicButton
              onPress={() => {
                Alert.alert('삭제', '정말 삭제하시겠습니까?', [
                  { text: '아니오', onPress: () => setModalVisible(false), style: 'cancel' },
                  { text: '예', onPress: onPressDelete, style: 'destructive' },
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
