'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import QuickDressWidget from '@/components/features/QuickDressWidget';

export default function WidgetPage() {
  const [selectedSize, setSelectedSize] = useState<'small' | 'medium' | 'large'>('medium');

  return (
    <Layout>
      <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Quick Dress Widget 🎛️
            </h1>
            <p className="text-gray-600">
              ホーム画面やデスクトップで使える、WeatherDressの即座確認ウィジェット
            </p>
          </motion.div>

          {/* Widget Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Live Demo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="mr-2">🎮</span>
                ライブデモ
              </h2>
              
              <div className="flex justify-center mb-6">
                <QuickDressWidget 
                  size={selectedSize}
                  homeStation="渋谷"
                />
              </div>

              {/* Size Controls */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ウィジェットサイズ
                  </label>
                  <div className="flex space-x-2">
                    {(['small', 'medium', 'large'] as const).map((size) => (
                      <motion.button
                        key={size}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedSize(size)}
                        className={`
                          px-4 py-2 rounded-lg font-medium transition-colors
                          ${selectedSize === size
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }
                        `}
                      >
                        {size === 'small' && 'S'}
                        {size === 'medium' && 'M'}
                        {size === 'large' && 'L'}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  💡 ウィジェットをクリックすると詳細が表示されます
                </div>
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="mr-2">✨</span>
                ウィジェットの特徴
              </h2>
              
              <div className="space-y-4">
                {[
                  {
                    icon: '⚡',
                    title: '0秒で確認',
                    description: 'ホーム画面を見るだけで今日の服装がわかる'
                  },
                  {
                    icon: '🎨',
                    title: '美しいデザイン',
                    description: 'グラデーションとアニメーションで視覚的に魅力的'
                  },
                  {
                    icon: '📱',
                    title: 'レスポンシブ対応',
                    description: 'スマホ、タブレット、デスクトップで最適表示'
                  },
                  {
                    icon: '🔄',
                    title: '自動更新',
                    description: '5分ごとに最新の天気と服装提案を取得'
                  },
                  {
                    icon: '👆',
                    title: 'インタラクティブ',
                    description: 'タップで詳細表示、長押しで設定変更'
                  },
                  {
                    icon: '⚙️',
                    title: 'カスタマイズ可能',
                    description: 'サイズ、色、表示項目を自由に設定'
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="text-2xl">{feature.icon}</div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{feature.title}</div>
                      <div className="text-sm text-gray-600">{feature.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Installation Guide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl mb-8"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="mr-2">📲</span>
              ウィジェットの追加方法
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* iOS */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <span className="mr-2">🍎</span>
                  iOS (iPhone/iPad)
                </h3>
                <ol className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="inline-block w-6 h-6 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center mr-2 mt-0.5">1</span>
                    ホーム画面を長押しして編集モードに入る
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-6 h-6 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center mr-2 mt-0.5">2</span>
                    左上の「+」ボタンをタップ
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-6 h-6 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center mr-2 mt-0.5">3</span>
                    「WeatherDress」を検索して選択
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-6 h-6 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center mr-2 mt-0.5">4</span>
                    好みのサイズを選んで「ウィジェットを追加」
                  </li>
                </ol>
              </div>

              {/* Android */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <span className="mr-2">🤖</span>
                  Android
                </h3>
                <ol className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="inline-block w-6 h-6 bg-green-500 text-white text-xs rounded-full flex items-center justify-center mr-2 mt-0.5">1</span>
                    ホーム画面の空いている場所を長押し
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-6 h-6 bg-green-500 text-white text-xs rounded-full flex items-center justify-center mr-2 mt-0.5">2</span>
                    「ウィジェット」をタップ
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-6 h-6 bg-green-500 text-white text-xs rounded-full flex items-center justify-center mr-2 mt-0.5">3</span>
                    「WeatherDress」を見つけて選択
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-6 h-6 bg-green-500 text-white text-xs rounded-full flex items-center justify-center mr-2 mt-0.5">4</span>
                    好みのサイズを選んでドラッグして配置
                  </li>
                </ol>
              </div>
            </div>
          </motion.div>

          {/* Size Examples */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="mr-2">📐</span>
              サイズバリエーション
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center">
              {[
                { size: 'small' as const, name: 'スモール', desc: 'コンパクトな情報表示' },
                { size: 'medium' as const, name: 'ミディアム', desc: '標準的なサイズ（推奨）' },
                { size: 'large' as const, name: 'ラージ', desc: '詳細情報も表示' }
              ].map((variant, index) => (
                <motion.div
                  key={variant.size}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-4">
                    <QuickDressWidget 
                      size={variant.size}
                      homeStation="渋谷"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{variant.name}</h3>
                  <p className="text-sm text-gray-600">{variant.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}