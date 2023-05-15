import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { HeroImage } from '../assets';
import * as Animatable from 'react-native-animatable';

const HomScreen = () => {

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

  return (
    <SafeAreaView className="bg-white flex-1 relative">
        <View className="flex-row px-6 mt-8 items-center space-x-2">
            <View className="w-16 h-16 bg-black rounded-full items-center justify-center">
                <Text className="text-[#00BCC9] text-3xl font-semibold">Go!</Text>
            </View>

            <Text className="text-[#2A2B4B] text-3xl font-semibold">Travel</Text>
        </View>

        <View className="px-6 mt-8 space-y-3">
            <Text className="text-[#3C6072] text-[42px]">여행을 즐겨봐요!</Text>
            <Text className="text-[#00BCC9] text-[38px] font-bold">Good Moments</Text>

            <Text className="text-[#3C6072] text-base">
                이 앱을 이용하여 여행지 주변 호텔, 식당, 관광 장소에 대해 검색해보세요
            </Text>
        </View>

        <View className="w-[340px] h-[340px] bg-[#00BCC9] rounded-full absolute bottom-36 -right-36"></View>
        <View className="w-[340px] h-[340px] bg-[#E99265] rounded-full absolute -bottom-28 -left-36"></View>

        <View className="flex-1 relative items-center justify-center">
            <Animatable.Image 
                animation="fadeIn" 
                easing="ease-in-out" 
                source={HeroImage} 
                className="w-full h-full object-cover mt-20"/>
            
            <TouchableOpacity onPress={() => navigation.navigate("Discover")} className="absolute bottom-20 w-24 h-24 border-l-2 border-r-2 border-t-4 border-[#00BCC9] rounded-full items-center justify-center">
                <Animatable.View 
                    animation={"pulse"} 
                    easing="ease-in-out" 
                    iterationCount={"infinite"} 
                    className="w-20 h-20 items-center justify-center rounded-full bg-[#00BCC9]">
                    <Text className="text-gray-50 text-[36px] font-semibold">Go</Text>
                </Animatable.View>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default HomScreen