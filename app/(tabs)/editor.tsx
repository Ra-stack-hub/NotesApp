import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  SafeAreaView,
  useColorScheme,
  useWindowDimensions,
} from "react-native";

export default function EditorScreen() {
  const systemTheme = useColorScheme();

  const [isDark] = useState(systemTheme === "dark");

  const { width } = useWindowDimensions();

  const isTablet = width > 768;

  const colors = {
    background: isDark ? "#121212" : "#FFFFFF",
    text: isDark ? "#FFFFFF" : "#000000",
    input: isDark ? "#1E1E1E" : "#F3F4F6",
    button: "#6366F1",
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Header */}
        <ImageBackground
          source={{
            uri: "https://images.unsplash.com/photo-1517842645767-c639042777db",
          }}
          style={styles.header}
          imageStyle={{ borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }}
        >
          <View style={styles.headerOverlay}>
            <Pressable style={styles.backButton}>
              <Text style={styles.buttonText}>Back</Text>
            </Pressable>

            <Text
              style={[
                styles.headerTitle,
                {
                  fontSize: isTablet ? 34 : 26,
                },
              ]}
            >
              Edit Note
            </Text>
          </View>
        </ImageBackground>

        {/* Inputs */}
        <View style={styles.inputContainer}>
          {/* Title Input */}
          <TextInput
            placeholder="Note Title"
            placeholderTextColor={isDark ? "#999" : "#777"}
            style={[
              StyleSheet.compose(styles.titleInput, {
                fontSize: isTablet ? 28 : 22,
              }),
              {
                backgroundColor: colors.input,
                color: colors.text,
              },
            ]}
          />

          {/* Content Input */}
          <TextInput
            placeholder="Write your note here..."
            placeholderTextColor={isDark ? "#999" : "#777"}
            multiline
            textAlignVertical="top"
            style={[
              StyleSheet.compose(styles.contentInput, {
                fontSize: isTablet ? 22 : 16,
              }),
              {
                backgroundColor: colors.input,
                color: colors.text,
              },
            ]}
          />
        </View>

        {/* Save Button */}
        <Pressable
          style={[
            styles.saveButton,
            {
              backgroundColor: colors.button,
            },
          ]}
        >
          <Text style={styles.saveText}>Save Note</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    height: 220,
    justifyContent: "flex-end",
  },

  headerOverlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  backButton: {
    width: 80,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    marginBottom: 20,
  },

  buttonText: {
    color: "white",
    fontWeight: "600",
  },

  headerTitle: {
    color: "white",
    fontWeight: "bold",
  },

  inputContainer: {
    flex: 1,
    padding: 20,
  },

  titleInput: {
    padding: 18,
    borderRadius: 16,
    marginBottom: 20,
    fontWeight: "700",
  },

  contentInput: {
    flex: 1,
    padding: 18,
    borderRadius: 16,
    lineHeight: 26,
  },

  saveButton: {
    margin: 20,
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
  },

  saveText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
});