'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* ヒーローセクション */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <div className="text-8xl mb-4 animate-float">🌤️</div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-6">
                WeatherDress
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
                毎朝の服装選びから解放される、<br />
                天気に合わせたパーソナル服装レコメンド
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/setup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-full shadow-lg transition-all duration-300 text-lg"
                >
                  今すぐ始める
                </motion.button>
              </Link>
              <Link href="/demo">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
                >
                  デモを見る
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* 特徴セクション */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">30秒で決定</h3>
              <p className="text-gray-600">
                駅名を入力するだけで、瞬時に最適な服装をレコメンド
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2">2地点対応</h3>
              <p className="text-gray-600">
                自宅と職場の天候差を考慮した賢い服装提案
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-bold mb-2">学習機能</h3>
              <p className="text-gray-600">
                使うほど精度が向上する、あなた専用のAIアシスタント
              </p>
            </div>
          </motion.div>

          {/* CTA セクション */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-3xl p-8 glass-effect"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
              自信を持って一日をスタート
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              もう朝の服装選びで悩む必要はありません。
              WeatherDressと一緒に、毎日を快適に過ごしましょう。
            </p>
            <Link href="/setup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-300"
              >
                無料で始める →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
