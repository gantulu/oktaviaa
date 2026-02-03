
import React from 'react';
import { Icons } from '../constants';

const Profile: React.FC = () => {
  return (
    <div className="p-6 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-24 h-24 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 mb-4 border-4 border-white shadow-lg overflow-hidden">
           <img src="https://picsum.photos/id/177/200/200" alt="Avatar" className="w-full h-full object-cover" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Oktavia Ramadhani</h2>
        <p className="text-gray-500 text-sm">Exclusive Gold Member</p>
      </div>

      <div className="space-y-4">
        <section className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-bold text-gray-900 mb-4 px-1">Pengaturan Akun</h3>
          <div className="space-y-2">
            <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
              <span className="text-sm text-gray-700">Informasi Pribadi</span>
              <Icons.Plus />
            </button>
            <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
              <span className="text-sm text-gray-700">Alamat Pengiriman</span>
              <Icons.Plus />
            </button>
            <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
              <span className="text-sm text-gray-700">Metode Pembayaran</span>
              <Icons.Plus />
            </button>
          </div>
        </section>

        <section className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-bold text-gray-900 mb-4 px-1">Riwayat Pesanan</h3>
          <div className="space-y-4">
            <div className="p-3 bg-rose-50/50 rounded-xl border border-rose-100">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-rose-600">ORD-2023-9921</span>
                <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">SELESAI</span>
              </div>
              <p className="text-[10px] text-gray-500 mb-1">24 November 2023</p>
              <p className="text-sm font-bold text-gray-900">Rp 1.250.000</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-gray-700">ORD-2023-8104</span>
                <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">DIKIRIM</span>
              </div>
              <p className="text-[10px] text-gray-500 mb-1">12 Desember 2023</p>
              <p className="text-sm font-bold text-gray-900">Rp 850.000</p>
            </div>
          </div>
        </section>

        <button className="w-full py-4 text-rose-600 font-bold text-sm hover:bg-rose-50 rounded-2xl transition-colors">
          Keluar dari Akun
        </button>
      </div>
    </div>
  );
};

export default Profile;
