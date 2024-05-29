import { useSelector } from 'react-redux';

export const useAuth = () => {
    const { userLogin } = useSelector(
        (state) => state.quanLyNguoiDung
    );
  return { userLogin }
}
