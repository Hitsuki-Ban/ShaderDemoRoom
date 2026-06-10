import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { I18nProvider } from '../shared/i18n/I18nProvider';
import { ShowroomPage } from './ShowroomPage';

export function App() {
  return (
    <I18nProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/room/voxel-water" replace />} />
          <Route path="/room/:roomId" element={<ShowroomPage />} />
          <Route path="*" element={<Navigate to="/room/voxel-water" replace />} />
        </Routes>
      </HashRouter>
    </I18nProvider>
  );
}
