import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Color from '../../config/color/Color';
import Header from '../../components/header/Header';
import CustomRadioButton from '../../components/cutomRadioButton/CutomRadioButton';
import { useEffect, useState } from 'react';
import FarmDairy from './component/FarmDairy';
import FarmLedger from './component/FarmLedger';
import { useRoute } from '@react-navigation/core';
import { RootStackParamList } from '../../stacks/mainStack/MainStack';
import { RouteProp } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';


type FarmScreenRouteProp = RouteProp<RootStackParamList, 'FarmScreen'>;

const FarmScreen = () => {
  const route = useRoute<FarmScreenRouteProp>();
  const [activeIndex, setActiveIndex] = useState(route.params?.activeIndex ?? 0);
  const Data = [
    { content: '영농일지', event: () => setActiveIndex(0), active: activeIndex === 0 },
    { content: '영농장부', event: () => setActiveIndex(1), active: activeIndex === 1 },
  ];
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: Color.WHITE }}>
        <Header type='default' firstIcon='back' title='영농일지/장부'></Header>
        <CustomRadioButton data={Data} />
        {activeIndex === 0 && <FarmDairy></FarmDairy>}
        {activeIndex === 1 && <FarmLedger></FarmLedger>}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FarmScreen;
