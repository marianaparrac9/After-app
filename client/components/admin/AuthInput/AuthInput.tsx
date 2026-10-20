import { Icon } from '../Icon/Icon';
import type { IconName } from '../Icon/Icon';

interface AuthInputProps {
  icon: IconName;
  type: string;
  placeholder: string;
}

export const AuthInput = ({ icon, type, placeholder }: AuthInputProps) => {
  return (
    <label className="auth-input">
      <Icon name={icon} size={18} />
      <input type={type} placeholder={placeholder} required />
    </label>
  );
};
