import { View, Text, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Hotels, Attractions, Restaurants, NotFound } from '../assets';
import { ScrollView } from 'react-native';
import MenuContainer from '../components/MenuContainer';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import ItemCarDontainer from '../components/ItemCarDontainer';
import { getPlacesData } from '../api';

const Discover = () => {
    const navigation = useNavigation();

    const [type, setType] = useState("restaurants");
    const [isLoading, setIsLoading] = useState(false);
    const [mainData, setMainData] = useState([]);
    const [bl_lat, setBl_lat] = useState(null);
    const [bl_lng, setBl_lng] = useState(null);
    const [tr_lat, setTr_lat] = useState(null);
    const [tr_lng, setTr_lng] = useState(null);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    useEffect(() => {
        setIsLoading(true);
        getPlacesData(bl_lat, bl_lng, tr_lat, tr_lng, type).then((data) => {
            setMainData(data);
            setInterval(() => {
                setIsLoading(false);
            }, 2000);
        });
    }, [bl_lat, bl_lng, tr_lat, tr_lng, type]);

  return (
    <SafeAreaView className="flex-1 bg-white relative">
        <View className="flex-row items-center justify-between px-8">
            <View>
                <Text className="text-[40px] text-[#0B646B] font-bold">Discover</Text>
                <Text className="text-[#527283] text-[36px]">the beauty today</Text>
            </View>

            <View className="w-12 h-12 bg-gray-400 rounded-md items-center justify-center">
                <Image
                    source={Avatar}
                    className="w-full h-full rounded-md object-cover"
                />
            </View>
        </View>

        <View className="flex-row items-center bg-white mx-4 rounded-xl py-1 px-4 shadow-lg mt-4">
            <GooglePlacesAutocomplete
                GooglePlacesDetailsQuery={{ fields: "geometry" }}
                placeholder='Search'
                fetchDetails={true}
                onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(details?.geometry?.viewport);
                setBl_lat(details?.geometry?.viewport?.southwest?.lat);
                setBl_lng(details?.geometry?.viewport?.southwest?.lng);
                setTr_lat(details?.geometry?.viewport?.northeast?.lat);
                setTr_lng(details?.geometry?.viewport?.northeast?.lng);
                }}
                query={{
                    key: 'AIzaSyDacRYNlCZBm9NSClowz0Cnx-yAN-4XBFU',
                    language: 'en',
                }}
            />
        </View>

        {isLoading ? <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#00ff00" />
        </View> :

        <ScrollView>
            <View className="flex-row items-center justify-between px-8 mt-8">
                <MenuContainer
                    key={"hotel"}
                    title="호텔"
                    imageSrc = {Hotels}
                    type={type}
                    setType={setType}
                />

                <MenuContainer
                    key={"attractions"}
                    title="관광 장소"
                    imageSrc = {Attractions}
                    type={type}
                    setType={setType}
                />

                <MenuContainer
                    key={"restaurants"}
                    title="식당"
                    imageSrc = {Restaurants}
                    type={type}
                    setType={setType}
                />
            </View>

            <View>
                <View className="flex-row items-center justify-between px-4 mt-8">
                    <Text className="text-[#2C7379] text-[28px] font-bold">검색 결과</Text>
                    <TouchableOpacity className="flex-row items-center justify-center space-x-2">
                        <Text className="text-[#ABC4C7] text-[20px] font-bold">탐색하기</Text>
                        <FontAwesome name="long-arrow-right" size={24} color="#ABC4C7" />
                    </TouchableOpacity>
                </View>

                <View className="px-4 mt-8 flex-row items-center justify-evenly flex-wrap">
                    {mainData?.length > 0 ? (
                        <>
                            {mainData?.map((data, i) => (
                                <ItemCarDontainer 
                                key={i} 
                                imageSrc={
                                    data?.photo?.images?.medium?.url
                                        ? data?.photo?.images?.medium?.url
                                        : "https://cdn.pixabay.com/photo/2015/10/30/12/22/eat-1014025_1280.jpg"
                                } 
                                title={data?.name} 
                                location={data?.location_string}
                                data={data}
                                />
                            ))}
                        </>
                        ) : (
                            <>
                                <View className="w-full h-[400px] items-center space-y-8 justify-center">
                                    <Image source={NotFound} className="w-32 h-32 object-cover" />
                                    <Text className="text-2xl text-[#428288] font-semibold">
                                        데이터를 찾지 못했어요...
                                    </Text>
                                </View>
                            </>
                        )}
                </View>
            </View>
        </ScrollView>
        }
    </SafeAreaView>
  )
}

export default Discover