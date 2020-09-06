/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Snackbar from 'react-native-snackbar';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {RefreshControl, Dimensions, View, ScrollView} from 'react-native';
const {width} = Dimensions.get('window');

import backgroundLogo from '../../assets/backgroundLogo.png';

import Container from '../../layout/App';

import Title from '../../components/Title';
import Avatar from '../../components/Avatar';

import api from '../../services/api';

import cowImage from '../../assets/cow.png';

import terneiro from '../../assets/terneiro.jpeg';
import vacaemlactacao from '../../assets/vacaemlactacao.jpg';
import vacaprenha from '../../assets/vacaprenha.jpeg';
import vacaseca from '../../assets/vacaseca.jpg';
import novilha from '../../assets/novilha.jpg';
import novilhaleiteira from '../../assets/novilhaleiteira.jpg';

import CalcHistoryActions from '../../store/ducks/calcHistory';

import {
  FlatListContainer,
  InputPickerContainer,
  InputPicker,
  InputPickerIcon,
  InputFieldItem,
  ResultBox,
  CategoryItem,
  CowContainer,
  CowImage,
  DateGroup,
  DateItem,
  Group,
  Separator,
  Item,
  MiddleSection,
  ResultTextContent,
  ResultTextTitle,
  TitleItem,
  NoContentText,
  LoadMoreItemsText,
  ModalContainer,
  ModalContent,
  ModalContainerTitle,
  ModalContainerDateTime,
  ModalContainerCloseButton,
  Header,
  BackButton,
  Label,
  RowItem,
  Value,
  ResultBoxModal,
  ResultBoxModalTitle,
  ResultBoxModalValue,
} from './styles';

const Skeleton = () => {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item
        flexDirection="column"
        alignItems="flex-start"
        marginTop={40}>
        <SkeletonPlaceholder.Item
          width={width / 2}
          height={30}
          marginBottom={20}
        />

        <SkeletonPlaceholder.Item
          width={width - 30}
          height={60}
          marginBottom={20}
        />
        <SkeletonPlaceholder.Item
          width={width - 30}
          height={60}
          marginBottom={20}
        />
        <SkeletonPlaceholder.Item
          width={width - 30}
          height={60}
          marginBottom={20}
        />
        <SkeletonPlaceholder.Item
          width={width - 30}
          height={60}
          marginBottom={20}
        />
        <SkeletonPlaceholder.Item
          width={width / 2}
          height={30}
          marginBottom={20}
        />

        <SkeletonPlaceholder.Item
          width={width - 30}
          height={60}
          marginBottom={20}
        />
        <SkeletonPlaceholder.Item
          width={width - 30}
          height={60}
          marginBottom={20}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

const Historic = ({navigation}) => {
  const [historic, setHistoric] = useState([]);
  const [modalConfig, setModalConfig] = useState({
    isVisible: false,
    item: {},
  });

  const [loadingFirst, setLoadingFirst] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 0,
    totalPages: 0,
    total: 0,
  });

  const dispatch = useDispatch();

  const {isConnected} = useSelector(state => state.offline);

  const {calcState} = useSelector(state => state.calcHistory);

  const getHistoric = async flag => {
    if (flag) {
      setLoading(true);
    } else {
      setLoadingFirst(true);
    }

    try {
      const response = await api.get('history', {
        params: {
          perPage: 10,
          page: flag ? pagination.page + 1 : 1,
          grouped: true,
        },
      });

      const {page, totalPages, totalData} = response.data;

      setPagination({page, totalPages, total: totalData});

      if (flag) {
        if (isConnected) {
          setHistoric([...historic, response.data.data[0]]);

          dispatch(
            CalcHistoryActions.addOfflineCalcToHistoryRequest(
              response.data.data,
            ),
          );
        }
        setLoadingFirst(false);
        setLoading(false);
      } else {
        if (isConnected) {
          setHistoric(response.data.data);

          dispatch(
            CalcHistoryActions.addOfflineCalcToHistoryRequest(
              response.data.data,
            ),
          );
        }
        setLoadingFirst(false);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoadingFirst(false);
      setLoading(false);

      Snackbar.show({
        text: 'Ouve algum erro no carregamento do histórico.',
        duration: 3000,
        backgroundColor: 'red',
        action: {
          text: 'Tentar novamente',
          textColor: 'white',
          onPress: () => {
            getHistoric();
          },
        },
      });
    }
  };

  useEffect(() => {
    getHistoric();
  }, []);

  function formateDate(str) {
    var mouthArray = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];

    const date = new Date(str);

    return `${date.getDate()} de ${mouthArray[date.getMonth()]}`;
  }

  function formatTime(str) {
    const date = new Date(str);

    return `${date.getHours()}:${
      date.getMinutes() < 10 ? '0' : ''
    }${date.getMinutes()}`;
  }

  return (
    <>
      <Container
        source={backgroundLogo}
        imageStyle={{
          top: 0,
          height: '90%',
        }}>
        <Header>
          <BackButton
            name="arrow-left"
            size={25}
            color="#888899"
            onPress={() => navigation.goBack()}
          />
          <Title size={24} value="Histórico" />
          <Avatar size={38} action={() => navigation.navigate('Perfil')} />
        </Header>
        {/* <InputPickerContainer>
          <InputPicker>
            <InputFieldItem label="Filtrar por data" value={null} />
          </InputPicker>
          <InputPickerIcon name="chevron-down" size={24} color="#d69d2b" />
        </InputPickerContainer> */}
        {loadingFirst ? (
          <Skeleton />
        ) : (
          <FlatListContainer
            data={isConnected ? historic : calcState}
            ListEmptyComponent={() => (
              <NoContentText>Não há items</NoContentText>
            )}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => getHistoric(false)}
              />
            }
            onEndReached={() =>
              pagination.page < pagination.totalPages &&
              !loading &&
              isConnected &&
              getHistoric(true)
            }
            onEndReachedThreshold={0.1}
            ListFooterComponent={
              <>
                {isConnected ? (
                  loading && pagination.page < pagination.totalPages ? (
                    <LoadMoreItemsText>
                      Carregando mais itens ...
                    </LoadMoreItemsText>
                  ) : (
                    <LoadMoreItemsText>Não há mais items</LoadMoreItemsText>
                  )
                ) : null}
              </>
            }
            renderItem={({item}) => (
              <Group>
                <DateGroup>{formateDate(item.created_at)}</DateGroup>

                {item.calcs.map(historicItem => (
                  <Item
                    key={historicItem._id}
                    onPress={() => {
                      setModalConfig({
                        isVisible: true,
                        item: historicItem,
                      });
                    }}>
                    <CowContainer>
                      <CowImage
                        source={
                          historicItem.config.animal.value === 'Terneiro(a)'
                            ? terneiro
                            : historicItem.config.animal.value ===
                              'Vaca em lactação'
                            ? vacaemlactacao
                            : historicItem.config.animal.value === 'Novilho(a)'
                            ? novilha
                            : historicItem.config.animal.value === 'Novilha'
                            ? novilhaleiteira
                            : historicItem.config.animal.value === 'Vaca Seca'
                            ? vacaseca
                            : historicItem.config.animal.value === 'Vaca Prenha'
                            ? vacaprenha
                            : cowImage
                        }
                        resizeMode="cover"
                      />
                    </CowContainer>
                    <MiddleSection>
                      <TitleItem>{historicItem.config.animal.name}</TitleItem>
                      <CategoryItem>
                        {historicItem.config.animal.value}
                      </CategoryItem>
                      <ResultBox>
                        <ResultTextTitle>Resultado:</ResultTextTitle>
                        <ResultTextContent>
                          {historicItem.results.map(
                            result => `${result.value} `,
                          )}
                        </ResultTextContent>
                      </ResultBox>
                    </MiddleSection>
                    <DateItem>{formatTime(historicItem.created_at)}</DateItem>
                  </Item>
                ))}
              </Group>
            )}
            keyExtractor={item => item.created_at}
          />
        )}
      </Container>
      <ModalContainer isVisible={modalConfig.isVisible}>
        <ScrollView style={{flex: 1}}>
          <ModalContent>
            <ModalContainerCloseButton
              name="x"
              color="#888899"
              size={24}
              onPress={() =>
                setModalConfig({
                  isVisible: false,
                  item: {},
                })
              }
            />
            <ModalContainerTitle size={19}>
              {modalConfig.item.config && modalConfig.item.config.calc.value}
            </ModalContainerTitle>
            <ModalContainerDateTime />
            <ModalContainerTitle
              size={14}
              alignSelf="flex-start"
              mt={23}
              mb={15}>
              Histórico da análise
            </ModalContainerTitle>
            <RowItem>
              <Label>Método de pastoreio:</Label>
              <Value>
                {modalConfig.item.config && modalConfig.item.config.calc.name}
              </Value>
            </RowItem>
            <RowItem>
              <Label>Forrageira:</Label>
              <Value>
                {modalConfig.item.config &&
                  modalConfig.item.config.pasture.value}
              </Value>
            </RowItem>
            <RowItem>
              <Label>Sistema de produção:</Label>
              <Value>
                {modalConfig.item.config && modalConfig.item.config.animal.name}
              </Value>
            </RowItem>

            <Separator />

            <ModalContainerTitle
              size={14}
              alignSelf="flex-start"
              mt={23}
              mb={15}>
              Informações dos animais
            </ModalContainerTitle>
            <RowItem>
              <Label>Peso:</Label>
              <Value>
                {modalConfig.item.inputs &&
                  modalConfig.item.inputs.find(input => input.key === 'peso')
                    .value}
                kg
              </Value>
            </RowItem>
            <RowItem>
              <Label>Categoria animal:</Label>
              <Value>
                {modalConfig.item.config &&
                  modalConfig.item.config.animal.value}
              </Value>
            </RowItem>

            <Separator />

            <ModalContainerTitle
              size={14}
              alignSelf="flex-start"
              mt={23}
              mb={15}>
              Informações sobre o sistema
            </ModalContainerTitle>

            <RowItem>
              <Label>Identificação do Potreiro:</Label>
              <Value>
                {modalConfig.item.inputs &&
                  modalConfig.item.inputs.find(
                    input => input.key === 'nomeDoPotreiro',
                  ).value}
              </Value>
            </RowItem>

            <RowItem>
              <Label>Data da avaliação:</Label>
              <Value>{formateDate(modalConfig.item.created_at)}</Value>
            </RowItem>

            {modalConfig.item.inputs &&
              modalConfig.item.inputs.map(
                item =>
                  (item.name !== 'Data de início do pastejo' ||
                    item.key === 'nomeDoPotreiro') && (
                    <RowItem>
                      <Label>{item.name}:</Label>
                      <Value>{item.value == '0' ? '-' : item.value}</Value>
                    </RowItem>
                  ),
              )}
            <RowItem />
            <ModalContainerTitle size={19} mt={15}>
              Resultado
            </ModalContainerTitle>
          </ModalContent>
          <ResultBoxModal>
            {modalConfig.item.results &&
              modalConfig.item.results.map(item => (
                <>
                  <ResultBoxModalTitle>{item.name}</ResultBoxModalTitle>
                  <ResultBoxModalValue>{item.value}</ResultBoxModalValue>
                </>
              ))}
          </ResultBoxModal>
        </ScrollView>
      </ModalContainer>
    </>
  );
};

export default Historic;
