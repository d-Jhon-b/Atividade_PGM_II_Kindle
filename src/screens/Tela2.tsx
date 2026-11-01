import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useKindle, Book } from '../context/KindleContext';

type FilterTab = 'Todos' | 'Lendo' | 'Lidos' | 'Favoritos';

export default function Tela2({ navigation: navProp }: { navigation?: any }) {
  const navHook = useNavigation<any>();
  const navigation = navProp || navHook;
  const { books, theme, setSelectedBookId, toggleFavorite, toggleLibrary } = useKindle();
  const [activeTab, setActiveTab] = useState<FilterTab>('Todos');
  const [isGridView, setIsGridView] = useState<boolean>(false);

  const filteredBooks = books.filter((book) => {
    if (activeTab === 'Todos') return book.inLibrary;
    if (activeTab === 'Lendo')
      return book.inLibrary && book.currentPage > 0 && !book.isCompleted;
    if (activeTab === 'Lidos') return book.isCompleted;
    if (activeTab === 'Favoritos') return book.isFavorite;
    return true;
  });

  const handleOpenBook = (book: Book) => {
    setSelectedBookId(book.id);
    navigation.navigate('Leitor');
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View
        style={[
          styles.header,
          { backgroundColor: theme.background, borderBottomColor: theme.border },
        ]}
      >
        <View>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Biblioteca</Text>
          <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
            {filteredBooks.length} {filteredBooks.length === 1 ? 'volume' : 'volumes'}{' '}
            disponíveis
          </Text>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={[
              styles.viewToggleBtn,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
            onPress={() => setIsGridView((prev) => !prev)}
          >
            <Ionicons
              name={isGridView ? 'list-outline' : 'grid-outline'}
              size={20}
              color={theme.primary}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.tabsRow}>
        {(['Todos', 'Lendo', 'Lidos', 'Favoritos'] as FilterTab[]).map((tab) => {
          const active = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabButton,
                {
                  backgroundColor: active ? theme.chipActiveBg : theme.chipBg,
                  borderColor: active ? theme.chipActiveBg : theme.border,
                },
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  {
                    color: active ? theme.chipActiveText : theme.chipText,
                    fontWeight: active ? '700' : '500',
                  },
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Book List or Grid */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      >
        {filteredBooks.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons
              name="bookshelf"
              size={48}
              color={theme.textSecondary}
            />
            <Text style={[styles.emptyTitle, { color: theme.text }]}>
              Nenhum mangá nesta aba
            </Text>
            <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
              Adicione volumes na tela de Início ou marque seus favoritos.
            </Text>
          </View>
        ) : isGridView ? (
          <View style={styles.gridContainer}>
            {filteredBooks.map((book) => {
              const pct = Math.round((book.currentPage / book.pages) * 100);
              return (
                <TouchableOpacity
                  key={book.id}
                  style={[
                    styles.gridCard,
                    { backgroundColor: theme.surface, borderColor: theme.border },
                  ]}
                  activeOpacity={0.85}
                  onPress={() => handleOpenBook(book)}
                >
                  <Image source={{ uri: book.coverUrl }} style={styles.gridCover} />
                  <Text
                    style={[styles.gridTitle, { color: theme.text }]}
                    numberOfLines={2}
                  >
                    {book.title}
                  </Text>
                  <Text style={[styles.gridMeta, { color: theme.primary }]}>
                    {pct}% concluído
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
          filteredBooks.map((book) => {
            const pct = Math.round((book.currentPage / book.pages) * 100);
            return (
              <TouchableOpacity
                key={book.id}
                style={[
                  styles.listItem,
                  { backgroundColor: theme.surface, borderColor: theme.border },
                ]}
                activeOpacity={0.85}
                onPress={() => handleOpenBook(book)}
              >
                <Image source={{ uri: book.coverUrl }} style={styles.listCover} />

                <View style={styles.listContent}>
                  <View style={styles.listTopRow}>
                    <Text
                      style={[styles.categoryBadge, { color: theme.primary }]}
                      numberOfLines={1}
                    >
                      {book.category.toUpperCase()} • {book.volume}
                    </Text>
                    <TouchableOpacity onPress={() => toggleFavorite(book.id)}>
                      <Ionicons
                        name={book.isFavorite ? 'heart' : 'heart-outline'}
                        size={19}
                        color={book.isFavorite ? '#EF4444' : theme.textSecondary}
                      />
                    </TouchableOpacity>
                  </View>

                  <Text
                    style={[styles.listTitle, { color: theme.text }]}
                    numberOfLines={2}
                  >
                    {book.title}
                  </Text>
                  <Text style={[styles.listAuthor, { color: theme.textSecondary }]}>
                    {book.author}
                  </Text>

                  <View style={styles.progressSection}>
                    <View
                      style={[styles.progressTrack, { backgroundColor: theme.border }]}
                    >
                      <View
                        style={[
                          styles.progressFill,
                          {
                            backgroundColor: book.isCompleted ? '#10B981' : theme.primary,
                            width: `${pct}%`,
                          },
                        ]}
                      />
                    </View>
                    <Text style={[styles.progressLabel, { color: theme.textSecondary }]}>
                      Pág. {book.currentPage}/{book.pages} ({pct}%)
                    </Text>
                  </View>

                  <View style={styles.actionsRow}>
                    <TouchableOpacity
                      style={[styles.readBtn, { backgroundColor: theme.primary }]}
                      onPress={() => handleOpenBook(book)}
                    >
                      <Ionicons name="book-outline" size={14} color="#0F1115" />
                      <Text style={styles.readBtnText}>
                        {book.currentPage > 0 ? 'Continuar' : 'Ler Agora'}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.removeBtn, { borderColor: theme.border }]}
                      onPress={() => toggleLibrary(book.id)}
                    >
                      <Ionicons
                        name={book.inLibrary ? 'checkmark-done' : 'add'}
                        size={15}
                        color={theme.textSecondary}
                      />
                      <Text
                        style={[styles.removeBtnText, { color: theme.textSecondary }]}
                      >
                        {book.inLibrary ? 'Salvo' : 'Salvar'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        )}

        {/* Sugestão para adicionar mais mangás do catálogo */}
        {activeTab === 'Todos' && books.some((b) => !b.inLibrary) && (
          <View style={styles.moreCatalogSection}>
            <Text style={[styles.moreCatalogTitle, { color: theme.text }]}>
              Disponíveis para baixar no Kindle Unlimited
            </Text>
            {books
              .filter((b) => !b.inLibrary)
              .map((book) => (
                <View
                  key={`add-${book.id}`}
                  style={[
                    styles.addCard,
                    { backgroundColor: theme.surface, borderColor: theme.border },
                  ]}
                >
                  <Image source={{ uri: book.coverUrl }} style={styles.addCardCover} />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.listTitle, { color: theme.text }]}>
                      {book.title}
                    </Text>
                    <Text style={[styles.listAuthor, { color: theme.textSecondary }]}>
                      {book.author} • {book.category}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.addBtn, { backgroundColor: theme.primary }]}
                    onPress={() => toggleLibrary(book.id)}
                  >
                    <Ionicons name="download-outline" size={16} color="#0F1115" />
                    <Text style={styles.addBtnText}>Baixar</Text>
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  viewToggleBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  tabButton: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 18,
    borderWidth: 1,
  },
  tabButtonText: {
    fontSize: 13,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 28,
    gap: 12,
  },
  listItem: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    gap: 14,
    marginBottom: 12,
  },
  listCover: {
    width: 85,
    height: 126,
    borderRadius: 8,
    backgroundColor: '#1E222B',
  },
  listContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  listTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryBadge: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  listTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginTop: 2,
  },
  listAuthor: {
    fontSize: 12,
    marginBottom: 6,
  },
  progressSection: {
    marginBottom: 8,
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressLabel: {
    fontSize: 11,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  readBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 5,
  },
  readBtnText: {
    color: '#0F1115',
    fontSize: 12,
    fontWeight: '700',
  },
  removeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    gap: 4,
  },
  removeBtnText: {
    fontSize: 12,
    fontWeight: '600',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  gridCard: {
    width: '47%',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
  },
  gridCover: {
    width: '100%',
    height: 190,
    borderRadius: 8,
    marginBottom: 8,
  },
  gridTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },
  gridMeta: {
    fontSize: 11,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  emptySubtitle: {
    fontSize: 13,
    textAlign: 'center',
  },
  moreCatalogSection: {
    marginTop: 14,
    gap: 10,
  },
  moreCatalogTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  addCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
    marginBottom: 8,
  },
  addCardCover: {
    width: 48,
    height: 68,
    borderRadius: 6,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    gap: 4,
  },
  addBtnText: {
    color: '#0F1115',
    fontSize: 12,
    fontWeight: '700',
  },
});
