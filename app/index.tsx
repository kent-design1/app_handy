import "./global.css"
import {FlatList, Image, Pressable, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {offers} from "@/constants";
import {Fragment} from "react";

export default function App() {
    return (
        <SafeAreaView className="">
            <FlatList data={offers} renderItem={({item, index}) =>{

               return (
                   <View>
                       <Pressable className= "offer-card" style={{backgroundColor: item.color}}>
                           {({pressed}) => (
                            <Fragment>
                                <View className= "h-full w-1/2">
                                    <Image source={item.image} className= "size-full" resizeMode={"contain"} />
                                </View>

                                <View className={"offer-card__info"}>
                                        <Text> {item.title}</Text>
                                </View>
                            </Fragment>
                           )}

                       </Pressable>
                   </View>
               )
            }} />
        </SafeAreaView>
    );
}