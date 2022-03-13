import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import data from "../../assets/ligands.json";

const Home = ({ navigation }) => {
  const [filtredData, setfiltredData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [search, setsearch] = useState("");

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  const fetchData = () => {
    setfiltredData(data);
    setmasterData(data);
  };

  const searchFilter = (search) => {
    setsearch(search);
    if (search === "") setfiltredData(masterData);
    else {
      setfiltredData(
        masterData.filter((item) =>
          item.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  };

  const ItemView = ({ item }) => {
    return (
        <TouchableOpacity onPress={() => {navigation.navigate("Protein", {ligand: item})}}>
            <Text style={styles.itemStyle}>{item}</Text>
        </TouchableOpacity>
    )};

  const ItemSeparatorView = () => {
    return (
      <View
        style={{ height: 0.5, width: "100%", backgroundColor: "#c8c8c8" }}
      />
    );
  };

  return (
    <View>
      <TextInput
        style={styles.TextInputStyle}
        value={search}
        placeholder="search for a protein"
        underlineColorAndroid="transparent"
        onChangeText={searchFilter}
      />
      <FlatList
        data={filtredData}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemStyle: {
    padding: 15,
  },

  TextInputStyle: {
    height: 50,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: "#009688",
    backgroundColor: "white",
  },
});

export default Home;
