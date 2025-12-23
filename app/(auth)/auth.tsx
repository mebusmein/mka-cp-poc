import { useState, useRef } from 'react';
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';

import { useSession } from '@/contexts/AuthContext';
import { usePlatform } from '@/hooks/usePlatform';

export default function AuthScreen() {
  const { login } = useSession();
  const { isDesktopWeb } = usePlatform();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const passwordInputRef = useRef<TextInput>(null);

  const handleLogin = async () => {
    setError('');
    setIsLoading(true);

    if (!email.trim()) {
      setError('Please enter your email');
      setIsLoading(false);
      return;
    }

    if (!password.trim()) {
      setError('Please enter your password');
      setIsLoading(false);
      return;
    }

    const success = await login(email, password);

    if (success) {
      router.replace('/(app)/tenant-select');
    } else {
      setError('Login failed. Please try again.');
    }

    setIsLoading(false);
  };

  const formContent = (
    <>
      {/* Header */}
      <View className="mb-12">
        <Text className="mb-2 text-4xl font-bold text-white">Welcome</Text>
        <Text className="text-lg text-slate-400">Sign in to continue</Text>
      </View>

      {/* Form */}
      <View className="space-y-4">
        <View>
          <Text className="mb-2 text-sm font-medium text-slate-300">Email</Text>
          <TextInput
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-4 text-base text-white"
            placeholder="Enter your email"
            placeholderTextColor="#64748b"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
            returnKeyType="next"
            onSubmitEditing={() => passwordInputRef.current?.focus()}
            blurOnSubmit={false}
          />
        </View>

        <View className="mt-4">
          <Text className="mb-2 text-sm font-medium text-slate-300">Password</Text>
          <TextInput
            ref={passwordInputRef}
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-4 text-base text-white"
            placeholder="Enter your password"
            placeholderTextColor="#64748b"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="password"
            returnKeyType="go"
            onSubmitEditing={handleLogin}
          />
        </View>

        {error ? (
          <View className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
            <Text className="text-center text-red-400">{error}</Text>
          </View>
        ) : null}

        <Pressable
          onPress={handleLogin}
          disabled={isLoading}
          className="mt-8 rounded-xl bg-indigo-500 py-4 active:bg-indigo-600 disabled:opacity-50">
          <Text className="text-center text-lg font-semibold text-white">
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Text>
        </Pressable>
      </View>

      {/* Footer hint */}
      <View className="mt-8">
        <Text className="text-center text-sm text-slate-500">
          Demo mode: Enter any email and password
        </Text>
      </View>
    </>
  );

  if (isDesktopWeb) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-900">
        <View className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
          {formContent}
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-slate-900">
      <View className="flex-1 justify-center px-8">{formContent}</View>
    </KeyboardAvoidingView>
  );
}
