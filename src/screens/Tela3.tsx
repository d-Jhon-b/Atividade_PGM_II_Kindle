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
import { useKindle } from '../context/KindleContext';

type ReaderThemeMode = 'dark' | 'sepia' | 'light';

export default function Tela3({ navigation: navProp }: { navigation?: any }) {
  const navHook = useNavigation<any>();
  const navigation = navProp || navHook;
  const {
    books,
    selectedBookId,
    setSelectedBookId,
    theme,
    toggleFavorite,
    toggleLibrary,
    updateProgress,
  } = useKindle();

  const book = books.find((b) => b.id === selectedBookId) || books[0];
  const [isReadingMode, setIsReadingMode] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<number>(16);
  const [readerMode, setReaderMode] = useState<ReaderThemeMode>('dark');
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number>(0);

  const readerPalette = {
    dark: { bg: '#0D0F12', surface: '#181B22', text: '#E5E7EB', muted: '#9CA3AF' },
    sepia: { bg: '#F4ECD8', surface: '#E8DEC3', text: '#3B2F2F', muted: '#6E5A4F' },
    light: { bg: '#FFFFFF', surface: '#F1F5F9', text: '#1E293B', muted: '#64748B' },
  }[readerMode];

  const pct = Math.round((book.currentPage / book.pages) * 100);
  const chapter = book.chapters[currentChapterIndex] || book.chapters[0];

  const handleAdvancePage = (delta: number) => {
    updateProgress(book.id, book.currentPage + delta);
  };

  if (isReadingMode) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: readerPalette.bg }]}>
        {/* Top Reader Toolbar */}
        <View
          style={[
            styles.readerHeader,
            { backgroundColor: readerPalette.surface, borderBottomColor: theme.border },
          ]}
        >
          <TouchableOpacity
            style={styles.readerBackBtn}
            onPress={() => setIsReadingMode(false)}
          >
            <Ionicons name="chevron-back" size={22} color={readerPalette.text} />
            <Text style={[styles.readerBackText, { color: readerPalette.text }]}>
              Detalhes
            </Text>
          </TouchableOpacity>

          <Text
            style={[styles.readerBookTitle, { color: readerPalette.text }]}
            numberOfLines={1}
          >
            {book.title}
          </Text>

          <TouchableOpacity onPress={() => toggleFavorite(book.id)}>
            <Ionicons
              name={book.isFavorite ? 'bookmark' : 'bookmark-outline'}
              size={22}
              color={book.isFavorite ? theme.primary : readerPalette.text}
            />
          </TouchableOpacity>
        </View>

        {/* Font & Theme Controls Bar */}
        <View
          style={[
            styles.readerControlsBar,
            { backgroundColor: readerPalette.surface, borderBottomColor: theme.border },
          ]}
        >
          <View style={styles.fontControls}>
            <TouchableOpacity
              style={[styles.fontBtn, { borderColor: readerPalette.muted }]}
              onPress={() => setFontSize((f) => Math.max(13, f - 2))}
            >
              <Text style={[styles.fontBtnText, { color: readerPalette.text }]}>A-</Text>
            </TouchableOpacity>
            <Text style={[styles.fontSizeDisplay, { color: readerPalette.muted }]}>
              {fontSize}px
            </Text>
            <TouchableOpacity
              style={[styles.fontBtn, { borderColor: readerPalette.muted }]}
              onPress={() => setFontSize((f) => Math.min(24, f + 2))}
            >
              <Text style={[styles.fontBtnText, { color: readerPalette.text }]}>A+</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.themeSwatches}>
            {(['dark', 'sepia', 'light'] as ReaderThemeMode[]).map((mode) => (
              <TouchableOpacity
                key={mode}
                style={[
                  styles.swatchCircle,
                  {
                    backgroundColor:
                      mode === 'dark'
                        ? '#0D0F12'
                        : mode === 'sepia'
                        ? '#F4ECD8'
                        : '#FFFFFF',
                    borderWidth: readerMode === mode ? 2.5 : 1,
                    borderColor:
                      readerMode === mode ? theme.primary : readerPalette.muted,
                  },
                ]}
                onPress={() => setReaderMode(mode)}
              />
            ))}
          </View>
        </View>

        {/* Reader Content */}
        <ScrollView
          contentContainerStyle={styles.readerBody}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.chapterBadge, { color: theme.primary }]}>
            KINDLE MANGA EDITION • {book.volume}
          </Text>
          <Text style={[styles.chapterTitle, { color: readerPalette.text }]}>
            {chapter.title}
          </Text>

          <Image source={{ uri: book.coverUrl }} style={styles.readerBannerImage} />

          {chapter.content.map((paragraph, idx) => (
            <Text
              key={idx}
              style={[
                styles.readerParagraph,
                {
                  color: readerPalette.text,
                  fontSize,
                  lineHeight: fontSize * 1.65,
                },
              ]}
            >
              {paragraph}
            </Text>
          ))}

          {/* Chapter Selector */}
          {book.chapters.length > 1 && (
            <View style={styles.chapterSwitchRow}>
              {book.chapters.map((ch, idx) => (
                <TouchableOpacity
                  key={ch.title}
                  style={[
                    styles.chapterChip,
                    {
                      backgroundColor:
                        currentChapterIndex === idx
                          ? theme.primary
                          : readerPalette.surface,
                    },
                  ]}
                  onPress={() => setCurrentChapterIndex(idx)}
                >
                  <Text
                    style={{
                      color:
                        currentChapterIndex === idx ? '#0F1115' : readerPalette.text,
                      fontWeight: '700',
                      fontSize: 12,
                    }}
                  >
                    Cap. {idx + 1}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>

        {/* Bottom Page Progress Controls */}
        <View
          style={[
            styles.readerFooter,
            { backgroundColor: readerPalette.surface, borderTopColor: theme.border },
          ]}
        >
          <TouchableOpacity
            style={[styles.pageStepBtn, { borderColor: readerPalette.muted }]}
            onPress={() => handleAdvancePage(-15)}
          >
            <Ionicons name="remove" size={18} color={readerPalette.text} />
            <Text style={{ color: readerPalette.text, fontSize: 12, fontWeight: '600' }}>
              15 págs
            </Text>
          </TouchableOpacity>

          <View style={{ alignItems: 'center' }}>
            <Text style={{ color: readerPalette.text, fontWeight: '700', fontSize: 13 }}>
              Página {book.currentPage} de {book.pages}
            </Text>
            <Text style={{ color: theme.primary, fontSize: 11, fontWeight: '600' }}>
              {pct}% concluído
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.pageStepBtn, { backgroundColor: theme.primary }]}
            onPress={() => handleAdvancePage(15)}
          >
            <Text style={{ color: '#0F1115', fontSize: 12, fontWeight: '700' }}>
              +15 págs
            </Text>
            <Ionicons name="add" size={18} color="#0F1115" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.detailsContainer}
      >
        {/* Seletor rápido de Mangás no topo */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.quickPicker}
        >
          {books.map((item) => {
            const selected = item.id === book.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.pickerPill,
                  {
                    backgroundColor: selected ? theme.primary : theme.surface,
                    borderColor: selected ? theme.primary : theme.border,
                  },
                ]}
                onPress={() => setSelectedBookId(item.id)}
              >
                <Text
                  style={{
                    color: selected ? '#0F1115' : theme.text,
                    fontSize: 12,
                    fontWeight: selected ? '700' : '500',
                  }}
                  numberOfLines={1}
                >
                  {item.title.split(' - ')[0]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Hero Book Card */}
        <View
          style={[
            styles.heroCard,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}
        >
          <Image source={{ uri: book.coverUrl }} style={styles.heroCover} />

          <View style={styles.heroInfo}>
            <View style={styles.badgeRow}>
              <View style={[styles.genreBadge, { backgroundColor: theme.chipBg }]}>
                <Text style={[styles.genreBadgeText, { color: theme.primary }]}>
                  {book.category}
                </Text>
              </View>
              <Text style={[styles.yearText, { color: theme.textSecondary }]}>
                {book.releaseYear} • {book.volume}
              </Text>
            </View>

            <Text style={[styles.heroTitle, { color: theme.text }]}>{book.title}</Text>
            <Text style={[styles.heroAuthor, { color: theme.textSecondary }]}>
              por {book.author}
            </Text>

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Ionicons name="star" size={16} color={theme.accent} />
                <Text style={[styles.statValue, { color: theme.text }]}>
                  {book.rating.toFixed(1)}
                </Text>
              </View>
              <View style={styles.statItem}>
                <MaterialCommunityIcons
                  name="book-open-variant"
                  size={16}
                  color={theme.primary}
                />
                <Text style={[styles.statValue, { color: theme.text }]}>
                  {book.pages} págs
                </Text>
              </View>
            </View>

            <View style={styles.heroButtons}>
              <TouchableOpacity
                style={[styles.primaryReadBtn, { backgroundColor: theme.primary }]}
                onPress={() => setIsReadingMode(true)}
              >
                <MaterialCommunityIcons
                  name="book-open-page-variant"
                  size={18}
                  color="#0F1115"
                />
                <Text style={styles.primaryReadBtnText}>Abrir Leitor Kindle</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.iconActionBtn,
                  { backgroundColor: theme.surfaceElevated, borderColor: theme.border },
                ]}
                onPress={() => toggleFavorite(book.id)}
              >
                <Ionicons
                  name={book.isFavorite ? 'heart' : 'heart-outline'}
                  size={20}
                  color={book.isFavorite ? '#EF4444' : theme.text}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Progress Card */}
        <View
          style={[
            styles.progressCard,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}
        >
          <View style={styles.progressHeader}>
            <Text style={[styles.progressCardTitle, { color: theme.text }]}>
              Seu Progresso de Leitura
            </Text>
            <Text style={[styles.progressPctText, { color: theme.primary }]}>
              {pct}% ({book.currentPage}/{book.pages} págs)
            </Text>
          </View>

          <View style={[styles.progressBarTrack, { backgroundColor: theme.border }]}>
            <View
              style={[
                styles.progressBarFill,
                { backgroundColor: theme.primary, width: `${pct}%` },
              ]}
            />
          </View>

          <View style={styles.quickProgressBtns}>
            <TouchableOpacity
              style={[styles.stepBtn, { borderColor: theme.border }]}
              onPress={() => handleAdvancePage(-20)}
            >
              <Text style={[styles.stepBtnText, { color: theme.textSecondary }]}>
                -20 págs
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.stepBtn, { borderColor: theme.border }]}
              onPress={() => handleAdvancePage(20)}
            >
              <Text style={[styles.stepBtnText, { color: theme.primary }]}>
                +20 págs lidas
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.stepBtn, { borderColor: theme.border }]}
              onPress={() => updateProgress(book.id, book.pages)}
            >
              <Text style={[styles.stepBtnText, { color: '#10B981' }]}>
                Marcar Lido
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sinopse */}
        <View
          style={[
            styles.synopsisCard,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}
        >
          <Text style={[styles.sectionHeading, { color: theme.text }]}>
            Sinopse da Edição
          </Text>
          <Text style={[styles.synopsisText, { color: theme.textSecondary }]}>
            {book.synopsis}
          </Text>

          <TouchableOpacity
            style={[styles.libraryToggleBtn, { borderColor: theme.border }]}
            onPress={() => toggleLibrary(book.id)}
          >
            <Ionicons
              name={book.inLibrary ? 'checkmark-circle' : 'add-circle-outline'}
              size={18}
              color={book.inLibrary ? '#10B981' : theme.primary}
            />
            <Text style={[styles.libraryToggleText, { color: theme.text }]}>
              {book.inLibrary
                ? 'Presente na sua Biblioteca Kindle'
                : 'Adicionar à Minha Biblioteca'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  detailsContainer: {
    paddingBottom: 28,
  },
  quickPicker: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  pickerPill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 18,
    borderWidth: 1,
    marginRight: 8,
  },
  heroCard: {
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 16,
    marginBottom: 14,
  },
  heroCover: {
    width: 115,
    height: 172,
    borderRadius: 10,
    backgroundColor: '#1E222B',
  },
  heroInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  genreBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  genreBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  yearText: {
    fontSize: 11,
  },
  heroTitle: {
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 21,
  },
  heroAuthor: {
    fontSize: 13,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
    marginVertical: 4,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  statValue: {
    fontSize: 13,
    fontWeight: '700',
  },
  heroButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  primaryReadBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  primaryReadBtnText: {
    color: '#0F1115',
    fontSize: 12,
    fontWeight: '800',
  },
  iconActionBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressCard: {
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 14,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  progressCardTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  progressPctText: {
    fontSize: 13,
    fontWeight: '700',
  },
  progressBarTrack: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  quickProgressBtns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  stepBtn: {
    flex: 1,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  stepBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
  synopsisCard: {
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 8,
  },
  synopsisText: {
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 14,
  },
  libraryToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    gap: 8,
  },
  libraryToggleText: {
    fontSize: 13,
    fontWeight: '600',
  },
  readerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  readerBackBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  readerBackText: {
    fontSize: 14,
    fontWeight: '600',
  },
  readerBookTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '700',
    marginHorizontal: 10,
  },
  readerControlsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  fontControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  fontBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
  },
  fontBtnText: {
    fontSize: 13,
    fontWeight: '700',
  },
  fontSizeDisplay: {
    fontSize: 12,
  },
  themeSwatches: {
    flexDirection: 'row',
    gap: 10,
  },
  swatchCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  readerBody: {
    padding: 20,
    paddingBottom: 36,
  },
  chapterBadge: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.7,
    marginBottom: 4,
  },
  chapterTitle: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 16,
  },
  readerBannerImage: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 18,
    resizeMode: 'cover',
  },
  readerParagraph: {
    marginBottom: 16,
    textAlign: 'justify',
  },
  chapterSwitchRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  chapterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  readerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  pageStepBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
    gap: 4,
  },
});
