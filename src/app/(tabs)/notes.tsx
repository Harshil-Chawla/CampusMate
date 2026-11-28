import { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "expo-router";
import { Colors, Spacing, BorderRadius } from "@/constants/theme";
import Header from "@/components/Header";
import CustomButton from "@/components/CustomButton";
import {
  Note,
  getNotes,
  addNote,
  updateNote,
  deleteNote,
} from "@/services/storage";

export default function NotesScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, [])
  );

  async function loadNotes() {
    const loaded = await getNotes();
    setNotes(loaded);
  }

  function openAddModal() {
    setEditingNote(null);
    setNoteTitle("");
    setNoteContent("");
    setModalVisible(true);
  }

  function openEditModal(note: Note) {
    setEditingNote(note);
    setNoteTitle(note.title);
    setNoteContent(note.content);
    setModalVisible(true);
  }

  async function handleSave() {
    if (!noteTitle.trim()) {
      Alert.alert("Error", "Please enter a note title.");
      return;
    }
    if (editingNote) {
      await updateNote(editingNote.id, noteTitle.trim(), noteContent.trim());
    } else {
      await addNote(noteTitle.trim(), noteContent.trim());
    }
    setModalVisible(false);
    setNoteTitle("");
    setNoteContent("");
    setEditingNote(null);
    await loadNotes();
  }

  async function handleDelete(id: string) {
    Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteNote(id);
          await loadNotes();
        },
      },
    ]);
  }

  function formatDate(isoString: string) {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Notes" subtitle={`${notes.length} note${notes.length !== 1 ? "s" : ""}`} />

      {/* Add Note Button */}
      <View style={styles.buttonContainer}>
        <CustomButton
          title="+ Create New Note"
          onPress={openAddModal}
          variant="primary"
        />
      </View>

      {/* Notes List */}
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.noteCard}
            onPress={() => openEditModal(item)}
            activeOpacity={0.7}
          >
            <View style={styles.noteHeader}>
              <Text style={styles.noteTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <TouchableOpacity
                onPress={() => handleDelete(item.id)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text style={styles.deleteIcon}>🗑️</Text>
              </TouchableOpacity>
            </View>
            {item.content ? (
              <Text style={styles.noteContent} numberOfLines={3}>
                {item.content}
              </Text>
            ) : null}
            <Text style={styles.noteDate}>
              {editingNote?.id === item.id ? "Editing..." : formatDate(item.updatedAt)}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>📝</Text>
            <Text style={styles.emptyTitle}>No notes yet</Text>
            <Text style={styles.emptySubtext}>
              Create your first note to start organizing your thoughts.
            </Text>
          </View>
        }
      />

      {/* Add/Edit Note Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingNote ? "Edit Note" : "New Note"}
            </Text>

            <Text style={styles.inputLabel}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Note title"
              placeholderTextColor={Colors.light.textSecondary}
              value={noteTitle}
              onChangeText={setNoteTitle}
              autoFocus
            />

            <Text style={styles.inputLabel}>Content</Text>
            <TextInput
              style={[styles.input, styles.contentInput]}
              placeholder="Write your note here..."
              placeholderTextColor={Colors.light.textSecondary}
              value={noteContent}
              onChangeText={setNoteContent}
              multiline
              textAlignVertical="top"
            />

            <View style={styles.modalButtons}>
              <CustomButton
                title="Cancel"
                onPress={() => {
                  setModalVisible(false);
                  setEditingNote(null);
                  setNoteTitle("");
                  setNoteContent("");
                }}
                variant="secondary"
              />
              <View style={{ width: Spacing.sm }} />
              <CustomButton
                title={editingNote ? "Save Changes" : "Create Note"}
                onPress={handleSave}
                variant="primary"
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  buttonContainer: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  listContent: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  noteCard: {
    backgroundColor: Colors.light.card,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  noteHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.xs,
  },
  noteTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: Colors.light.text,
    flex: 1,
    marginRight: Spacing.sm,
  },
  deleteIcon: {
    fontSize: 16,
  },
  noteContent: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    lineHeight: 20,
    marginBottom: Spacing.sm,
  },
  noteDate: {
    fontSize: 12,
    color: Colors.light.textSecondary,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Spacing.xxl * 2,
  },
  emptyEmoji: {
    fontSize: 60,
    marginBottom: Spacing.md,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: Spacing.xs,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    textAlign: "center",
    paddingHorizontal: Spacing.xl,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: Colors.light.card,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: Spacing.lg,
    textAlign: "center",
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: Spacing.xs,
  },
  input: {
    backgroundColor: Colors.light.background,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  contentInput: {
    minHeight: 120,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
