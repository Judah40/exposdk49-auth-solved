import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth } from "../../../../useContext";

const index = () => {
  const { user, login, logout } = useAuth();

  const logoutUser = () => {
    logout();
  };
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          logoutUser();
        }}
      >
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default index;
