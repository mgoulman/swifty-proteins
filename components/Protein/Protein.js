import React from "react";
import {view, Text, View} from "react-native";
import axios from "axios";
import matchAll from "string.prototype.matchall";
import parsePdb from "parse-pdb";

const Protein = async({route}) => {

    const {ligand} = route.params;
    const url = `https://files.rcsb.org/ligands/view/${ligand}_model.pdb`;
    axios(url)
    .then((res) => {
        if (res.data) {
            let array = [...matchAll(res.data, /^CONECT(:?\s*\d+.+)+/gm)];
            let atomsPdb = parsePdb(res.data);
            array = array.filter((el, key) => key < atomsPdb.atoms?.length);
            console.log(array);
        }
    }).catch((error) => {
        console.log(error);
    })

    
    
    return (
        <View>

        </View>
    )
}

export default Protein