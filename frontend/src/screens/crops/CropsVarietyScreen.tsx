import { ScrollView, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { Divider } from '../../components/basic/Divider';
import { Spacer } from '../../components/basic/Spacer';
import Header from '../../components/header/Header';
import * as Typo from '../../components/typography/Typography';
import * as Color from '../../config/color/Color';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { useRoute } from '@react-navigation/core';
import { NavigationProp, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../stacks/mainStack/MainStack';
import { useEffect, useState } from 'react';
import { getCropVarieties } from '../../apis/services/crops/Crops';

interface Variety {
  cropId: number;
  cropsVarietyId: number;
  cropsVarietyName: string;
}

const Container = styled.View`
  margin-left: ${20 * widthPercent}px;
  margin-right: ${20 * widthPercent}px;
  margin-bottom: ${20 * heightPercent}px;
  row-gap: ${5 * heightPercent}px;
`;

const CropsVarietyScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'CropsVarietyScreen'>>();
  const { plantName, plantId, value } = route.params;
  const [varieties, setVarieties] = useState<Variety[]>([]);

  useEffect(() => {
    const fetchCropVarieties = async () => {
      try {
        const { dataBody } = await getCropVarieties(plantId);
        setVarieties(dataBody);
      } catch (error) {
        console.error('Error fetching crop varieties:', error);
      }
    };

    fetchCropVarieties();
  }, [plantId]);

  // 작물 상세 정보로 이동
  const moveCropsDetailScreen = (cropsId: number, varietyName: string, cropsVarietyId: number) => {
    navigation.navigate('CropsDetailScreen', { cropsId, plantName, varietyName, cropsVarietyId });
  };

  // 재배환경 등록으로 이동
  const moveEnvironmentPlantScreen = (cropsVarietyId: number, varietyName: string) => {
    navigation.navigate('EnvironmentPlantScreen', { plantName, cropsVarietyId, varietyName });
  };

  const onPressHandler = (cropsId: number, cropsVarietyId: number, varietyName: string) => {
    // value 1: 작물 상세정보, 2: 재배환경 등록
    if (value === 1) {
      moveCropsDetailScreen(cropsId, varietyName, cropsVarietyId);
    } else if (value === 2) {
      moveEnvironmentPlantScreen(cropsVarietyId, varietyName);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.WHITE }}>
      <ScrollView style={{ flex: 1, backgroundColor: Color.WHITE }} contentContainerStyle={{ paddingBottom: 50 * heightPercent }}>
        {/*헤더*/}
        <Header type={'default'} firstIcon={'back'} title={plantName} />
        <Spacer space={20} />
        {/*품종 선택 안내메시지*/}
        <Container>
          <Typo.BODY2_M>
            {plantName} <Typo.BODY2_M color={Color.GREEN600}>품종</Typo.BODY2_M>을 선택해주세요
          </Typo.BODY2_M>
        </Container>
        {/*품종선택*/}
        <Container>
          {varieties.map((variety, index) => (
            <View key={index}>
              <TouchableOpacity onPress={() => onPressHandler(variety.cropId, variety.cropsVarietyId, variety.cropsVarietyName)}>
                <Spacer space={23} />
                <Typo.BODY3_M>{variety.cropsVarietyName}</Typo.BODY3_M>
                <Spacer space={23} />
              </TouchableOpacity>
              <Divider marginHorizontal={1} />
            </View>
          ))}
        </Container>
      </ScrollView>
    </View>
  );
};

export default CropsVarietyScreen;
