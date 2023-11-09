import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth } from "../../../../useContext";

const index = () => {
  const { user, login, logout } = useAuth();

  const logoutUser = () => {
    logout();
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity
        onPress={() => {
          logoutUser();
        }}
      >
        <Text>Sign Out</Text>
      </TouchableOpacity>

      <Text>{user ? user.usename : null}</Text>
    </View>
  );
};

export default index;
