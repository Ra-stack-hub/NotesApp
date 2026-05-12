import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  Switch,
  Text,
  View,
  FlatList,
  TextInput,
  Pressable,
  useColorScheme,
  useWindowDimensions,
} from "react-native";

const themes = {
  light: {
    background: "#FFFFFF",
    card: "#F5F5F5",
    text: "#1A1A1A",
    subtext: "#666666",
    accent: "#6C63FF",
    input: "#EFEFEF",
  },

  dark: {
    background: "#121212",
    card: "#1E1E1E",
    text: "#FFFFFF",
    subtext: "#AAAAAA",
    accent: "#9D97FF",
    input: "#2A2A2A",
  },
};

const notes = [
  {
    id: "1",
    title: "Meeting Notes",
    content: "Discuss project UI and React Native assignment...",
    date: "11 May 2026",
  },

  {
    id: "2",
    title: "Shopping List",
    content: "Milk, Bread, Coffee, Eggs...",
    date: "10 May 2026",
  },

  {
    id: "3",
    title: "Ideas",
    content: "Build a responsive Notes App using Expo...",
    date: "9 May 2026",
  },

  {
    id: "4",
    title: "Assignments",
    content: "Complete React Native UI assignment...",
    date: "8 May 2026",
  },
];

const HomeScreen = () => {
  // System Theme
  const systemScheme = useColorScheme();

  // Manual Theme Override
  const [manualDark, setManualDark] = useState<boolean | null>(null);

  // Search State
  const [search, setSearch] = useState("");

  // Final Theme Logic
  const isDark =
    manualDark !== null ? manualDark : systemScheme === "dark";

  // Theme Object
  const theme = isDark ? themes.dark : themes.light;

  // Responsive Layout
  const { width } = useWindowDimensions();

  const isTablet = width > 768;

  // Filter Notes
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      {/* Status Bar */}
      <StatusBar style={isDark ? "light" : "dark"} />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text
            style={[
              styles.heading,
              {
                color: theme.text,
                fontSize: isTablet ? 38 : 30,
              },
            ]}
          >
            My Notes
          </Text>

          <Text
            style={[
              styles.subtitle,
              {
                color: theme.subtext,
              },
            ]}
          >
            Organize your thoughts easily
          </Text>
        </View>

        {/* Theme Switch */}
        <Switch
          value={isDark}
          onValueChange={setManualDark}
          trackColor={{
            false: "#ccc",
            true: theme.accent,
          }}
          thumbColor="white"
        />
      </View>

      {/* Search Input */}
      <TextInput
        placeholder="Search notes..."
        placeholderTextColor={theme.subtext}
        value={search}
        onChangeText={setSearch}
        style={[
          StyleSheet.compose(styles.searchInput, {
            fontSize: isTablet ? 22 : 16,
          }),

          {
            backgroundColor: theme.input,
            color: theme.text,
          },
        ]}
      />

      {/* Notes List */}
      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        renderItem={({ item }) => (
          <Pressable
            style={[
              StyleSheet.compose(styles.card, {
                padding: isTablet ? 28 : 18,
              }),

              {
                backgroundColor: theme.card,
              },
            ]}
          >
            <Text
              style={[
                styles.noteTitle,
                {
                  color: theme.text,
                  fontSize: isTablet ? 26 : 20,
                },
              ]}
            >
              {item.title}
            </Text>

            <Text
              style={[
                styles.noteContent,
                {
                  color: theme.subtext,
                  fontSize: isTablet ? 18 : 15,
                },
              ]}
            >
              {item.content}
            </Text>

            <Text
              style={[
                styles.noteDate,
                {
                  color: theme.subtext,
                  fontSize: isTablet ? 15 : 12,
                },
              ]}
            >
              {item.date}
            </Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  heading: {
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },

  searchInput: {
    padding: 15,
    borderRadius: 16,
    marginBottom: 22,
  },

  card: {
    borderRadius: 20,
    marginBottom: 18,

    // Android Shadow
    elevation: 4,

    // iOS Shadow
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  noteTitle: {
    fontWeight: "700",
    marginBottom: 10,
  },

  noteContent: {
    lineHeight: 24,
  },

  noteDate: {
    marginTop: 14,
  },
});