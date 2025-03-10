import React from 'react';
import { X } from 'lucide-react';
import { AuthForm } from './AuthForm';

interface AuthModalProps {
  mode: 'login' | 'register';
  onClose: () => void;
  onSuccess: () => void;
  onToggleMode: () => void;
}

export function AuthModal({ mode, onClose, onSuccess, onToggleMode }: AuthModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
        >
          <X size={20} />
        </button>
        
        <h2 className="text-2xl font-bold mb-6">
          {mode === 'login' ? 'Sign In' : 'Create Account'}
        </h2>

        <AuthForm mode={mode} onSuccess={onSuccess} />

        <div className="mt-4 text-center text-sm text-gray-600">
          {mode === 'login' ? (
            <>
              Don't have an account?{' '}
              <button
                onClick={onToggleMode}
                className="text-blue-600 hover:text-blue-500"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                onClick={onToggleMode}
                className="text-blue-600 hover:text-blue-500"
              >
                Sign In
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}