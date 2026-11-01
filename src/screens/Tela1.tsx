import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useKindle, Book } from '../context/KindleContext';

const CATEGORIES = [
  'Explorar',
  'Shonen',
  'Seinen',
  'Manhwa',
  'Fantasia Sombria',
  'Ação & Aventura',
];

export default function Tela1({ navigation: navProp }: { navigation?: any }) {
  const navHook = useNavigation<any>();
  const navigation = navProp || navHook;
  const { books, theme, toggleTheme, setSelectedBookId, toggleFavorite } = useKindle();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Explorar');

  const handleOpenBook = (book: Book) => {
    setSelectedBookId(book.id);
    navigation.navigate('Leitor');
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'Explorar' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const libraryBooks = filteredBooks.filter((b) => b.inLibrary);
  const recommendedBooks = filteredBooks;
  const continueReadingBook =
    books.find((b) => b.inLibrary && b.currentPage > 0 && !b.isCompleted) || books[0];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={theme.isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />

      {/* Top Search & Notification Bar (fiel ao layout do Kindle da atividade) */}
      <View style={[styles.headerContainer, { backgroundColor: theme.background }]}>
        <TouchableOpacity
          style={[styles.iconButton, { backgroundColor: theme.surface }]}
          onPress={() => navigation.navigate('Mais')}
          accessibilityLabel="Notificações e metas"
        >
          <Ionicons name="notifications-outline" size={22} color={theme.text} />
          <View style={[styles.badgeDot, { backgroundColor: theme.primary }]} />
        </TouchableOpacity>

        <View
          style={[
            styles.searchBar,
            { backgroundColor: theme.searchBg, borderColor: theme.border },
          ]}
        >
          <Ionicons name="search-outline" size={19} color={theme.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Pesquisar no Kindle..."
            placeholderTextColor={theme.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color={theme.textSecondary} />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={[styles.iconButton, { backgroundColor: theme.surface }]}
          onPress={toggleTheme}
          accessibilityLabel="Alternar tema claro ou escuro"
        >
          <Ionicons
            name={theme.isDark ? 'sunny-outline' : 'moon-outline'}
            size={21}
            color={theme.primary}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsContainer}
        >
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <TouchableOpacity
                key={category}
                style={[
                  styles.chip,
                  {
                    backgroundColor: isSelected ? theme.chipActiveBg : theme.chipBg,
                    borderColor: isSelected ? theme.chipActiveBg : theme.border,
                  },
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.chipText,
                    {
                      color: isSelected ? theme.chipActiveText : theme.chipText,
                      fontWeight: isSelected ? '700' : '500',
                    },
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Card Continuar Lendo */}
        {searchQuery === '' && selectedCategory === 'Explorar' && continueReadingBook && (
          <TouchableOpacity
            style={[
              styles.continueCard,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
            activeOpacity={0.88}
            onPress={() => handleOpenBook(continueReadingBook)}
          >
            <Image
              source={{ uri: continueReadingBook.coverUrl }}
              style={styles.continueCover}
            />
            <View style={styles.continueInfo}>
              <View style={styles.continueTagRow}>
                <MaterialCommunityIcons
                  name="book-open-page-variant-outline"
                  size={14}
                  color={theme.primary}
                />
                <Text style={[styles.continueLabel, { color: theme.primary }]}>
                  CONTINUAR LENDO
                </Text>
              </View>
              <Text style={[styles.continueTitle, { color: theme.text }]} numberOfLines={1}>
                {continueReadingBook.title}
              </Text>
              <Text style={[styles.continueAuthor, { color: theme.textSecondary }]}>
                {continueReadingBook.author} • {continueReadingBook.volume}
              </Text>

              <View style={styles.progressRow}>
                <View style={[styles.progressBarBg, { backgroundColor: theme.border }]}>
                  <View
                    style={[
                      styles.progressBarFill,
                      {
                        backgroundColor: theme.primary,
                        width: `${Math.round(
                          (continueReadingBook.currentPage / continueReadingBook.pages) * 100
                        )}%`,
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.progressPercent, { color: theme.textSecondary }]}>
                  {Math.round(
                    (continueReadingBook.currentPage / continueReadingBook.pages) * 100
                  )}
                  %
                </Text>
              </View>
            </View>
            <Ionicons name="play-circle" size={34} color={theme.primary} />
          </TouchableOpacity>
        )}

        {/* Seção 1: Da sua biblioteca (igual ao PDF) */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <MaterialCommunityIcons name="bookshelf" size={20} color={theme.primary} />
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Da sua biblioteca
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Biblioteca')}>
            <Text style={[styles.seeAllText, { color: theme.primary }]}>Ver tudo</Text>
          </TouchableOpacity>
        </View>

        {libraryBooks.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
              Nenhum mangá encontrado na biblioteca com esse filtro.
            </Text>
          </View>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalBookList}
          >
            {libraryBooks.map((book) => {
              const pct = Math.round((book.currentPage / book.pages) * 100);
              return (
                <TouchableOpacity
                  key={book.id}
                  style={styles.bookCard}
                  activeOpacity={0.85}
                  onPress={() => handleOpenBook(book)}
                >
                  <View style={styles.coverWrapper}>
                    <Image source={{ uri: book.coverUrl }} style={styles.bookCover} />
                    <TouchableOpacity
                      style={styles.favoriteBadge}
                      onPress={() => toggleFavorite(book.id)}
                    >
                      <Ionicons
                        name={book.isFavorite ? 'heart' : 'heart-outline'}
                        size={16}
                        color={book.isFavorite ? '#EF4444' : '#FFFFFF'}
                      />
                    </TouchableOpacity>
                    {book.isCompleted && (
                      <View style={styles.completedRibbon}>
                        <Text style={styles.completedRibbonText}>LIDO</Text>
                      </View>
                    )}
                  </View>
                  <Text
                    style={[styles.bookTitle, { color: theme.text }]}
                    numberOfLines={2}
                  >
                    {book.title}
                  </Text>
                  <Text
                    style={[styles.bookAuthor, { color: theme.textSecondary }]}
                    numberOfLines={1}
                  >
                    {book.author}
                  </Text>
                  <View style={styles.miniProgressRow}>
                    <View
                      style={[styles.miniProgressTrack, { backgroundColor: theme.border }]}
                    >
                      <View
                        style={[
                          styles.miniProgressFill,
                          { backgroundColor: theme.primary, width: `${pct}%` },
                        ]}
                      />
                    </View>
                    <Text style={[styles.miniProgressText, { color: theme.textSecondary }]}>
                      {pct}%
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}

        {/* Seção 2: Para você em Mangás, Quadrinhos e Graphic Novels (inspirado no PDF) */}
        <View style={[styles.sectionHeader, { marginTop: 12 }]}>
          <View style={styles.sectionTitleRow}>
            <Ionicons name="sparkles-outline" size={18} color={theme.accent} />
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Para você em Mangás & Manhwas
            </Text>
          </View>
        </View>
        <Text style={[styles.sectionSubtitle, { color: theme.textSecondary }]}>
          Recomendações baseadas nas suas leituras recentes no Kindle Unlimited
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalBookList}
        >
          {recommendedBooks.map((book) => (
            <TouchableOpacity
              key={`rec-${book.id}`}
              style={styles.bookCard}
              activeOpacity={0.85}
              onPress={() => handleOpenBook(book)}
            >
              <View style={styles.coverWrapper}>
                <Image source={{ uri: book.coverUrl }} style={styles.bookCover} />
                <View
                  style={[
                    styles.categoryTag,
                    { backgroundColor: 'rgba(15, 17, 21, 0.82)' },
                  ]}
                >
                  <Text style={styles.categoryTagText}>{book.category}</Text>
                </View>
              </View>
              <Text style={[styles.bookTitle, { color: theme.text }]} numberOfLines={2}>
                {book.title}
              </Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={13} color={theme.accent} />
                <Text style={[styles.ratingText, { color: theme.text }]}>
                  {book.rating.toFixed(1)}
                </Text>
                <Text style={[styles.reviewsText, { color: theme.textSecondary }]}>
                  ({(book.reviewsCount / 1000).toFixed(1)}k)
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={[styles.seeMoreButton, { borderColor: theme.border }]}
          onPress={() => navigation.navigate('Biblioteca')}
        >
          <Text style={[styles.seeMoreText, { color: theme.primary }]}>VER MAIS</Text>
          <Ionicons name="chevron-forward" size={16} color={theme.primary} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    gap: 10,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badgeDot: {
    position: 'absolute',
    top: 9,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 42,
    borderRadius: 21,
    paddingHorizontal: 14,
    borderWidth: 1,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 0,
  },
  scrollContent: {
    paddingBottom: 28,
  },
  chipsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  chipText: {
    fontSize: 13,
  },
  continueCard: {
    marginHorizontal: 16,
    marginTop: 6,
    marginBottom: 18,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  continueCover: {
    width: 56,
    height: 82,
    borderRadius: 8,
  },
  continueInfo: {
    flex: 1,
  },
  continueTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 3,
  },
  continueLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  continueTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  continueAuthor: {
    fontSize: 12,
    marginBottom: 8,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressBarBg: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressPercent: {
    fontSize: 11,
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 6,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  sectionSubtitle: {
    fontSize: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '600',
  },
  horizontalBookList: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    gap: 14,
  },
  bookCard: {
    width: 136,
    marginRight: 14,
  },
  coverWrapper: {
    position: 'relative',
    width: 136,
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 8,
    backgroundColor: '#1E222B',
  },
  bookCover: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  favoriteBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedRibbon: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: '#10B981',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 5,
  },
  completedRibbonText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  categoryTag: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  categoryTagText: {
    color: '#38BDF8',
    fontSize: 10,
    fontWeight: '700',
  },
  bookTitle: {
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 17,
    marginBottom: 2,
  },
  bookAuthor: {
    fontSize: 11,
    marginBottom: 5,
  },
  miniProgressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  miniProgressTrack: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  miniProgressFill: {
    height: '100%',
  },
  miniProgressText: {
    fontSize: 10,
    fontWeight: '600',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
  },
  reviewsText: {
    fontSize: 11,
  },
  seeMoreButton: {
    marginHorizontal: 16,
    marginTop: 12,
    paddingVertical: 11,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seeMoreText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  emptyBox: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 13,
  },
});
