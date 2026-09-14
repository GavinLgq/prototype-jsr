import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { KajianPage } from './pages/Kajian'
import { KajianDetail } from './pages/KajianDetail'
import { Community } from './pages/Community'
import { Dapur } from './pages/Dapur'
import { DapurDetail } from './pages/DapurDetail'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { NotFound } from './pages/NotFound'
import { Login } from './pages/auth/Login'
import { Register } from './pages/auth/Register'
import { Verify } from './pages/auth/Verify'
import { DashboardLayout } from './pages/dashboard/DashboardLayout'
import { DashboardOverview } from './pages/dashboard/Overview'
import { MemberCard } from './pages/dashboard/MemberCard'
import { Vouchers } from './pages/dashboard/Vouchers'
import { ActivityHistory } from './pages/dashboard/Activity'
import { Bookmarks } from './pages/dashboard/Bookmarks'
import { Partnership } from './pages/dashboard/Partnership'
import { Profile } from './pages/dashboard/Profile'
import { AdminLayout } from './pages/admin/AdminLayout'
import { AdminOverview } from './pages/admin/AdminOverview'
import { ResourcePage } from './pages/admin/ResourcePage'
import {
  articleResource,
  bannerResource,
  eventResource,
  kajianResource,
  memberResource,
  videoResource,
  voucherResource,
} from './pages/admin/resources'

export default function App() {
  return (
    <Routes>
      {/* Public site */}
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="kajian" element={<KajianPage />} />
        <Route path="kajian/:slug" element={<KajianDetail />} />
        <Route path="community" element={<Community />} />
        <Route path="dapur" element={<Dapur />} />
        <Route path="dapur/:slug" element={<DapurDetail />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="verify" element={<Verify />} />

        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="card" element={<MemberCard />} />
          <Route path="vouchers" element={<Vouchers />} />
          <Route path="activity" element={<ActivityHistory />} />
          <Route path="bookmarks" element={<Bookmarks />} />
          <Route path="partnership" element={<Partnership />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>

      {/* CMS — its own chrome, no public navbar/footer */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminOverview />} />
        <Route path="kajian" element={<ResourcePage config={kajianResource} />} />
        <Route path="videos" element={<ResourcePage config={videoResource} />} />
        <Route path="events" element={<ResourcePage config={eventResource} />} />
        <Route path="articles" element={<ResourcePage config={articleResource} />} />
        <Route path="vouchers" element={<ResourcePage config={voucherResource} />} />
        <Route path="members" element={<ResourcePage config={memberResource} />} />
        <Route path="banners" element={<ResourcePage config={bannerResource} />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  )
}
