import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useKindle } from '../context/KindleContext';

export default function Tela4({ navigation: navProp }: { navigation?: any }) {
  const navHook = useNavigation<any>();
  const navigation = navProp || navHook;
  const { books, theme, toggleTheme, readingStreakDays } = useKindle();
  const [whisperSync, setWhisperSync] = useState(true);
  const [wifiOnlyDownload, setWifiOnlyDownload] = useState(true);

  const totalPagesRead = books.reduce((acc, b) => acc + b.currentPage, 0);
  const completedCount = books.filter((b) => b.isCompleted).length;
  const favoritesCount = books.filter((b) => b.isFavorite).length;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View
        style={[
          styles.header,
          { backgroundColor: theme.background, borderBottomColor: theme.border },
        ]}
      >
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Mais & Hábitos de Leitura
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
          Amazon Kindle Manga Edition • Fatec DSM 5º Semestre
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Reading Insights Card */}
        <View
          style={[
            styles.streakCard,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}
        >
          <View style={styles.streakTop}>
            <View style={[styles.flameCircle, { backgroundColor: 'rgba(245,158,11,0.16)' }]}>
              <Ionicons name="flame" size={28} color={theme.accent} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.streakTitle, { color: theme.text }]}>
                {readingStreakDays} dias seguidos de leitura!
              </Text>
              <Text style={[styles.streakSubtitle, { color: theme.textSecondary }]}>
                Continue lendo pelo menos 1 capítulo por dia para bater seu recorde.
              </Text>
            </View>
          </View>

          <View style={styles.statsGrid}>
            <View
              style={[
                styles.statBox,
                { backgroundColor: theme.surfaceElevated, borderColor: theme.border },
              ]}
            >
              <MaterialCommunityIcons
                name="book-check-outline"
                size={22}
                color={theme.primary}
              />
              <Text style={[styles.statNumber, { color: theme.text }]}>
                {completedCount}
              </Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                Volumes Lidos
              </Text>
            </View>

            <View
              style={[
                styles.statBox,
                { backgroundColor: theme.surfaceElevated, borderColor: theme.border },
              ]}
            >
              <Ionicons name="document-text-outline" size={22} color={theme.primary} />
              <Text style={[styles.statNumber, { color: theme.text }]}>
                {totalPagesRead}
              </Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                Páginas Lidas
              </Text>
            </View>

            <View
              style={[
                styles.statBox,
                { backgroundColor: theme.surfaceElevated, borderColor: theme.border },
              ]}
            >
              <Ionicons name="heart" size={22} color="#EF4444" />
              <Text style={[styles.statNumber, { color: theme.text }]}>
                {favoritesCount}
              </Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                Favoritos
              </Text>
            </View>
          </View>
        </View>

        {/* Settings List */}
        <Text style={[styles.sectionHeader, { color: theme.textSecondary }]}>
          PREFERÊNCIAS DO APLICATIVO
        </Text>

        <View
          style={[
            styles.settingsGroup,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}
        >
          <View style={[styles.settingRow, { borderBottomColor: theme.border }]}>
            <View style={styles.settingLeft}>
              <Ionicons
                name={theme.isDark ? 'moon' : 'sunny'}
                size={20}
                color={theme.primary}
              />
              <View>
                <Text style={[styles.settingTitle, { color: theme.text }]}>
                  Modo Escuro (Kindle Dark)
                </Text>
                <Text style={[styles.settingDesc, { color: theme.textSecondary }]}>
                  Alternar entre o tema escuro moderno e o tema claro
                </Text>
              </View>
            </View>
            <Switch
              value={theme.isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: '#64748B', true: theme.primary }}
            />
          </View>

          <View style={[styles.settingRow, { borderBottomColor: theme.border }]}>
            <View style={styles.settingLeft}>
              <MaterialCommunityIcons name="cloud-sync" size={20} color={theme.primary} />
              <View>
                <Text style={[styles.settingTitle, { color: theme.text }]}>
                  Sincronização Whispersync
                </Text>
                <Text style={[styles.settingDesc, { color: theme.textSecondary }]}>
                  Sincronizar última página lida entre dispositivos
                </Text>
              </View>
            </View>
            <Switch
              value={whisperSync}
              onValueChange={setWhisperSync}
              trackColor={{ false: '#64748B', true: theme.primary }}
            />
          </View>

          <View style={[styles.settingRow, { borderBottomWidth: 0 }]}>
            <View style={styles.settingLeft}>
              <Ionicons name="wifi" size={20} color={theme.primary} />
              <View>
                <Text style={[styles.settingTitle, { color: theme.text }]}>
                  Download de Mangás HD via Wi-Fi
                </Text>
                <Text style={[styles.settingDesc, { color: theme.textSecondary }]}>
                  Economizar dados móveis ao baixar volumes
                </Text>
              </View>
            </View>
            <Switch
              value={wifiOnlyDownload}
              onValueChange={setWifiOnlyDownload}
              trackColor={{ false: '#64748B', true: theme.primary }}
            />
          </View>
        </View>

        {/* Atalhos Rápidos */}
        <Text style={[styles.sectionHeader, { color: theme.textSecondary }]}>
          NAVEGAÇÃO RÁPIDA
        </Text>

        <View
          style={[
            styles.settingsGroup,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}
        >
          <TouchableOpacity
            style={[styles.navRow, { borderBottomColor: theme.border }]}
            onPress={() => navigation.navigate('index')}
          >
            <View style={styles.settingLeft}>
              <Ionicons name="home-outline" size={20} color={theme.primary} />
              <Text style={[styles.settingTitle, { color: theme.text }]}>
                Ir para Tela 1 (Início & Busca)
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={theme.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navRow, { borderBottomColor: theme.border }]}
            onPress={() => navigation.navigate('Biblioteca')}
          >
            <View style={styles.settingLeft}>
              <Ionicons name="library-outline" size={20} color={theme.primary} />
              <Text style={[styles.settingTitle, { color: theme.text }]}>
                Ir para Tela 2 (Minha Biblioteca)
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={theme.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navRow, { borderBottomWidth: 0 }]}
            onPress={() => navigation.navigate('Leitor')}
          >
            <View style={styles.settingLeft}>
              <Ionicons name="book-outline" size={20} color={theme.primary} />
              <Text style={[styles.settingTitle, { color: theme.text }]}>
                Ir para Tela 3 (Detalhes & Leitor)
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={theme.textSecondary} />
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
  header: {
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
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  streakCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 20,
  },
  streakTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  flameCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  streakSubtitle: {
    fontSize: 12,
    marginTop: 2,
    lineHeight: 17,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  statBox: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    gap: 4,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 11,
    textAlign: 'center',
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 8,
    marginLeft: 4,
  },
  settingsGroup: {
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 20,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderBottomWidth: 1,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    paddingRight: 10,
  },
  settingTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  settingDesc: {
    fontSize: 11,
    marginTop: 2,
  },
});
