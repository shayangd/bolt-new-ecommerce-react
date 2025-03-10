export interface AuthFormProps {
  mode: 'login' | 'register';
  onSuccess: () => void;
}

export interface AuthModalProps {
  mode: 'login' | 'register';
  onClose: () => void;
  onSuccess: () => void;
  onToggleMode: () => void;
}