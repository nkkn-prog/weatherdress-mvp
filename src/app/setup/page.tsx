'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

interface Station {
  name: string;
  latitude: number;
  longitude: number;
  prefecture: string;
}

interface FormData {
  homeStation: string;
  workStation: string;
  temperatureSensitivity: 'cold' | 'normal' | 'warm';
  style: 'casual' | 'business' | 'sporty';
}

export default function SetupPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    homeStation: '',
    workStation: '',
    temperatureSensitivity: 'normal',
    style: 'casual',
  });
  const [suggestions, setSuggestions] = useState<{
    home: Station[];
    work: Station[];
  }>({
    home: [],
    work: [],
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 駅名検索のデバウンス処理
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (formData.homeStation.length > 0) {
        await searchStations(formData.homeStation, 'home');
      }
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [formData.homeStation]);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (formData.workStation.length > 0) {
        await searchStations(formData.workStation, 'work');
      }
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [formData.workStation]);

  const searchStations = async (query: string, type: 'home' | 'work') => {
    if (query.length < 1) {
      setSuggestions(prev => ({ ...prev, [type]: [] }));
      return;
    }

    try {
      // 模擬的な駅検索API（実際の実装では実際のAPIを呼び出し）
      const mockStations: Station[] = [
        { name: '渋谷', latitude: 35.6580, longitude: 139.7016, prefecture: '東京都' },
        { name: '新宿', latitude: 35.6896, longitude: 139.7006, prefecture: '東京都' },
        { name: '池袋', latitude: 35.7295, longitude: 139.7109, prefecture: '東京都' },
        { name: '品川', latitude: 35.6284, longitude: 139.7387, prefecture: '東京都' },
        { name: '東京', latitude: 35.6812, longitude: 139.7671, prefecture: '東京都' },
        { name: '横浜', latitude: 35.4657, longitude: 139.6224, prefecture: '神奈川県' },
        { name: '大阪', latitude: 34.7024, longitude: 135.4959, prefecture: '大阪府' },
        { name: '京都', latitude: 34.9859, longitude: 135.7581, prefecture: '京都府' },
      ];

      const filtered = mockStations.filter(station =>
        station.name.includes(query) || station.name.startsWith(query)
      );

      setSuggestions(prev => ({ ...prev, [type]: filtered }));
    } catch (error) {
      console.error('Station search failed:', error);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const selectStation = (station: Station, type: 'home' | 'work') => {
    const field = type === 'home' ? 'homeStation' : 'workStation';
    handleInputChange(field, station.name);
    setSuggestions(prev => ({ ...prev, [type]: [] }));
  };

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.homeStation.trim()) {
        newErrors.homeStation = '自宅の最寄り駅を選択してください';
      }
      if (!formData.workStation.trim()) {
        newErrors.workStation = '職場の最寄り駅を選択してください';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(step)) return;

    setLoading(true);
    try {
      // 模擬的な設定保存処理
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Setup completed:', formData);
      // ダッシュボードにリダイレクト
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Setup failed:', error);
      setErrors({ general: '設定の保存に失敗しました。もう一度お試しください。' });
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🚉</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                通勤ルートを設定
              </h2>
              <p className="text-gray-600">
                自宅と職場の最寄り駅を設定して、気温差を考慮した服装提案を受け取りましょう
              </p>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <Input
                  label="自宅の最寄り駅"
                  placeholder="駅名を入力してください"
                  value={formData.homeStation}
                  onChange={(e) => handleInputChange('homeStation', e.target.value)}
                  error={errors.homeStation}
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  }
                />
                {suggestions.home.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 mt-1"
                  >
                    {suggestions.home.map((station, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ backgroundColor: '#f3f4f6' }}
                        onClick={() => selectStation(station, 'home')}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                      >
                        <div className="font-medium">{station.name}</div>
                        <div className="text-sm text-gray-500">{station.prefecture}</div>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </div>

              <div className="relative">
                <Input
                  label="職場の最寄り駅"
                  placeholder="駅名を入力してください"
                  value={formData.workStation}
                  onChange={(e) => handleInputChange('workStation', e.target.value)}
                  error={errors.workStation}
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  }
                />
                {suggestions.work.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 mt-1"
                  >
                    {suggestions.work.map((station, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ backgroundColor: '#f3f4f6' }}
                        onClick={() => selectStation(station, 'work')}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                      >
                        <div className="font-medium">{station.name}</div>
                        <div className="text-sm text-gray-500">{station.prefecture}</div>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🎯</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                あなたの好みを教えてください
              </h2>
              <p className="text-gray-600">
                パーソナライズされた服装提案のため、あなたの体感温度とスタイルを設定しましょう
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  体感温度の傾向
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'cold', label: '寒がり', icon: '🥶', desc: '他の人より寒く感じる' },
                    { value: 'normal', label: '普通', icon: '😊', desc: '一般的な体感温度' },
                    { value: 'warm', label: '暑がり', icon: '🔥', desc: '他の人より暑く感じる' },
                  ].map((option) => (
                    <motion.button
                      key={option.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleInputChange('temperatureSensitivity', option.value as any)}
                      className={`
                        p-4 rounded-xl border-2 transition-all duration-200 text-center
                        ${formData.temperatureSensitivity === option.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                        }
                      `}
                    >
                      <div className="text-2xl mb-2">{option.icon}</div>
                      <div className="font-medium text-gray-900">{option.label}</div>
                      <div className="text-xs text-gray-500 mt-1">{option.desc}</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  普段のスタイル
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'casual', label: 'カジュアル', icon: '👕', desc: 'リラックスした服装' },
                    { value: 'business', label: 'ビジネス', icon: '👔', desc: 'オフィス向けの服装' },
                    { value: 'sporty', label: 'スポーティ', icon: '🏃', desc: 'アクティブな服装' },
                  ].map((option) => (
                    <motion.button
                      key={option.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleInputChange('style', option.value as any)}
                      className={`
                        p-4 rounded-xl border-2 transition-all duration-200 text-center
                        ${formData.style === option.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                        }
                      `}
                    >
                      <div className="text-2xl mb-2">{option.icon}</div>
                      <div className="font-medium text-gray-900">{option.label}</div>
                      <div className="text-xs text-gray-500 mt-1">{option.desc}</div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg w-full"
        >
          {/* プログレスバー */}
          <div className="mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="flex space-x-2">
                {[1, 2].map((stepNumber) => (
                  <div
                    key={stepNumber}
                    className={`
                      w-3 h-3 rounded-full transition-all duration-300
                      ${step >= stepNumber ? 'bg-blue-500' : 'bg-gray-200'}
                    `}
                  />
                ))}
              </div>
            </div>
            <div className="bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                initial={{ width: '50%' }}
                animate={{ width: `${(step / 2) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="text-center mt-2 text-sm text-gray-600">
              ステップ {step} / 2
            </div>
          </div>

          {/* フォームコンテンツ */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
            {errors.general && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
              >
                <p className="text-red-600 text-sm">{errors.general}</p>
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              {renderStepContent()}
            </AnimatePresence>

            {/* ナビゲーションボタン */}
            <div className="flex justify-between mt-8">
              {step > 1 ? (
                <Button
                  variant="outline"
                  onClick={handleBack}
                >
                  戻る
                </Button>
              ) : (
                <div />
              )}

              {step < 2 ? (
                <Button
                  onClick={handleNext}
                >
                  次へ
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  loading={loading}
                >
                  設定完了
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}