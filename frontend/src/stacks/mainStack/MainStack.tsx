import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../../screens/main/MainScreen';
import FarmDairyAddScreen from '../../screens/farmDairy/FarmDairyAddScreen';
import FarmLedgerAddScreen from '../../screens/farmDairy/FarmLedgerAddScreen';
import CreatePostScreen from '../../screens/post/CreatePostScreen';
import DetailPostScreen from '../../screens/post/DetailPostScreen';
import UpdatePostScreen from '../../screens/post/UpdatePostScreen';
import MyProfileScreen from '../../screens/myProfile/MyProfileScreen';
import MarketScreen from '../../screens/market/MarketScreen';
import MarketDetailScreen from '../../screens/market/MarketDetailScreen';
import MarketModifyScreen from '../../screens/market/MarketModifyScreen';
import MarketSearchScreen from '../../screens/market/MarketSearchScreen';
import FcmTestScreen from '../../screens/FcmTestScreen';
import CropsScreen from '../../screens/crops/CropsScreen';
import CropsVarietyScreen from '../../screens/crops/CropsVarietyScreen';
import ChattingRoomScreen from '../../screens/chat/ChattingRoomScreen';
import AddCropsScreen from '../../screens/cropsResister/AddCropsScreen';
import EnvironmentPlantScreen from '../../screens/cropsResister/EnvironmentPlantScreen';
import ModifyProfileScreen from '../../screens/myProfile/ModifyProfileScreen';
import DiseasePlantScreen from '../../screens/plantDisease/DiseasePlantScreen';
import MyPostScreen from '../../screens/myPost/MyPostScreen';
import SearchPostScreen from '../../screens/post/SearchPostScreen';
import CropsDetailScreen from '../../screens/crops/CropsDetailScreen';
import DetailDiseasePlantScreen from '../../screens/plantDisease/DetailDiseasePlantScreen';
import ChatListScreen from '../../screens/chat/ChatListScreen';
import FavoriteProductScreen from '../../screens/favoriteProduct/FavoriteProductScreen';
import WeatherScreen from '../../screens/weather/WeatherScreen';
import { PostProps } from '../../components/post/Post';
import CameraScreen from '../../screens/plantDisease/CarmeraScreen';
import FarmDairyDetailScreen from '../../screens/farmDairy/FarmDairyDetailScreen';
import FarmLedgerDetailScreen from '../../screens/farmDairy/FramLedgerDetailScreen';
import FarmScreen from '../../screens/farmDairy/FarmScreen';
import BottomNavigation from '../../components/navigation/BottomNavigation';
import MarketRegistScreen from '../../screens/market/MarketRegistScreen';
import PostCodeScreen from '../../screens/PostCodeScreen';
import DetailMyCropsScreen from '../../screens/cropsResister/DetailMyCropsScreen';
import UpdateMyCropsScreen from '../../screens/cropsResister/UpdateMyCropsScreen';
import GovernmentScreen from '../../screens/government/GovernmentScreen';
import AdminScreen from '../../screens/admin/AdminScreen';
import AdminDetailScreen from '../../screens/admin/AdminDetailScreen';

type DiagnosisResult = {
  content: string;
  disease: string;
  environment: string;
  isHealty: boolean;
  plant: string;
  protect: {
    basic: string[];
  };
};

export type RootStackParamList = {
  AddCropsScreen: undefined;
  AdminDetailScreen: { id: number };
  AdminScreen: undefined;
  BottomNavigation: { screen?: string };
  BottomTabStackNavigator: undefined;
  CameraScreen: { value: number };
  ChatListScreen: undefined;
  ChattingRoomScreen: { id: string; name: string };
  CropsDetailScreen: { cropsId: number; plantName: string; varietyName: string; cropsVarietyId: number };
  CropsScreen: undefined;
  CropsVarietyScreen: { plantName: string; plantId: number; value?: number };
  CreatePostScreen: undefined;
  DetailDiseasePlantScreen: { photo: { uri: string }; diagnosisResult: DiagnosisResult };
  DetailMyCropsScreen: { myCropsId: number };
  DetailPostScreen: { id: number };
  DiseasePlantScreen: undefined;
  EnvironmentPlantScreen: {
    plantName: string;
    cropsVarietyId?: number;
    varietyName?: string;
    sido?: string;
    gugun?: string;
    dong?: string;
  };
  FarmDairyAddScreen: undefined;
  FarmDairyDetailScreen: { diary: any };
  FarmLedgerAddScreen: undefined;
  FarmLedgerDetailScreen: { accountBookId: number; today: string };
  FarmScreen: { activeIndex: number };
  FavoriteProductScreen: undefined;
  FcmTestScreen: undefined;
  GovernmentScreen: undefined;
  MainScreen: undefined;
  MarketDetailScreen: { id: number };
  MarketModifyScreen: { id: number; address: string; x: number; y: number };
  MarketRegistScreen: { address: string; x: number; y: number };
  MarketScreen: undefined;
  MarketSearchScreen: undefined;
  ModifyProfileScreen: { sido: string; gugun: string; dong: string; address: string };
  MyPostScreen: undefined;
  MyProfileScreen: undefined;
  PlantResisterScreen: undefined;
  PostCodeScreen: { id: number; screenName: string; plantName?: string; cropsVarietyId?: number };
  SearchPostScreen: undefined;
  SetLocationScreen: { value: number; varietyName: string; plantName: string; cropsVarietyId?: number };
  UpdateMyCropsScreen: { myCropsId: number; sido?: string; gugun?: string; dong?: string };
  UpdatePostScreen: { id: number };
  WeatherScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName='BottomNavigation'>
      {/*<Stack.Navigator*/}
      {/*  initialRouteName='FcmTestScreen'*/}
      {/*  screenOptions={{*/}
      {/*    headerShown: false,*/}
      {/*  }}*/}
      {/*>*/}
      <Stack.Screen name='BottomNavigation' component={BottomNavigation} options={{ headerShown: false }} />
      {/* 관리자 페이지 */}
      <Stack.Screen name='AdminScreen' component={AdminScreen} options={{ headerShown: false }} />
      <Stack.Screen name='AdminDetailScreen' component={AdminDetailScreen} options={{ headerShown: false }} />
      {/* 장터 페이지 */}
      <Stack.Screen name='MainScreen' component={MainScreen} options={{ headerShown: false }} />
      <Stack.Screen name='MarketScreen' component={MarketScreen} options={{ headerShown: false }} />
      <Stack.Screen name='MarketRegistScreen' component={MarketRegistScreen} options={{ headerShown: false }} />
      <Stack.Screen name='MarketDetailScreen' component={MarketDetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name='MarketModifyScreen' component={MarketModifyScreen} options={{ headerShown: false }} />
      <Stack.Screen name='MarketSearchScreen' component={MarketSearchScreen} options={{ headerShown: false }} />
      {/* 영농일지,장부 페이지 */}
      <Stack.Screen name='FarmScreen' component={FarmScreen} options={{ headerShown: false }} />
      <Stack.Screen name='FarmDairyAddScreen' component={FarmDairyAddScreen} options={{ headerShown: false }} />
      <Stack.Screen name='FarmLedgerAddScreen' component={FarmLedgerAddScreen} options={{ headerShown: false }} />
      <Stack.Screen name='FarmDairyDetailScreen' component={FarmDairyDetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name='FarmLedgerDetailScreen' component={FarmLedgerDetailScreen} options={{ headerShown: false }} />
      {/*게시글 CRU 페이지*/}
      <Stack.Screen name='CreatePostScreen' component={CreatePostScreen} options={{ headerShown: false }} />
      <Stack.Screen name='DetailPostScreen' component={DetailPostScreen} options={{ headerShown: false }} />
      <Stack.Screen name='UpdatePostScreen' component={UpdatePostScreen} options={{ headerShown: false }} />
      {/*게시글 검색 페이지*/}
      <Stack.Screen name='SearchPostScreen' component={SearchPostScreen} options={{ headerShown: false }} />
      {/*작성한 게시글 조회 페이지*/}
      <Stack.Screen name='MyPostScreen' component={MyPostScreen} options={{ headerShown: false }} />
      {/* 채팅 페이지 */}
      <Stack.Screen name='ChattingRoomScreen' component={ChattingRoomScreen} options={{ headerShown: false }} />
      {/* 마이 페이지 */}
      <Stack.Screen name='MyProfileScreen' component={MyProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name='FcmTestScreen' component={FcmTestScreen} options={{ headerShown: false }} />
      <Stack.Screen name='ModifyProfileScreen' component={ModifyProfileScreen} options={{ headerShown: false }} />
      {/*작물 도감 페이지*/}
      <Stack.Screen name='CropsScreen' component={CropsScreen} options={{ headerShown: false }} />
      <Stack.Screen name='CropsVarietyScreen' component={CropsVarietyScreen} options={{ headerShown: false }} />
      <Stack.Screen name='CropsDetailScreen' component={CropsDetailScreen} options={{ headerShown: false }} />
      {/*작물 진단 페이지*/}
      <Stack.Screen name='DiseasePlantScreen' component={DiseasePlantScreen} options={{ headerShown: false }} />
      <Stack.Screen name='CameraScreen' component={CameraScreen} options={{ headerShown: false }} />
      <Stack.Screen name='DetailDiseasePlantScreen' component={DetailDiseasePlantScreen} options={{ headerShown: false }} />
      {/*작물 등록 페이지*/}
      <Stack.Screen name='AddCropsScreen' component={AddCropsScreen} options={{ headerShown: false }} />
      <Stack.Screen name='EnvironmentPlantScreen' component={EnvironmentPlantScreen} options={{ headerShown: false }} />
      <Stack.Screen name='DetailMyCropsScreen' component={DetailMyCropsScreen} options={{ headerShown: false }} />
      <Stack.Screen name='UpdateMyCropsScreen' component={UpdateMyCropsScreen} options={{ headerShown: false }} />
      {/* 채팅 페이지 */}
      <Stack.Screen name='ChatListScreen' component={ChatListScreen} options={{ headerShown: false }} />
      {/* 관심상품 페이지 */}
      <Stack.Screen name='FavoriteProductScreen' component={FavoriteProductScreen} options={{ headerShown: false }} />
      {/*날씨 페이지*/}
      <Stack.Screen name='WeatherScreen' component={WeatherScreen} options={{ headerShown: false }} />
      <Stack.Screen name='PostCodeScreen' component={PostCodeScreen} options={{ headerShown: false }} />
      {/* 정부지원금 페이지 */}
      <Stack.Screen name='GovernmentScreen' component={GovernmentScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default MainStack;
