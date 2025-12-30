// Fungsi Utama untuk Menggambar Dashboard Supervisor (SPV)
window.renderSPVDashboard = function(container) {
    container.innerHTML = `
        <div class="max-w-4xl mx-auto w-full animate-fadeIn">
            <div class="flex justify-between items-center mb-8">
                <div>
                    <h1 class="text-2xl font-black text-slate-800">Dashboard SPV</h1>
                    <p class="text-slate-500 text-sm">Pantau omset dan transaksi real-time</p>
                </div>
                <div class="bg-indigo-100 p-3 rounded-2xl">
                    <i data-lucide="layout-dashboard" class="text-indigo-600"></i>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div class="bg-indigo-600 p-6 rounded-[2rem] text-white shadow-xl shadow-indigo-100">
                    <p class="text-xs opacity-80 mb-1">Total Hari Ini</p>
                    <h2 id="total-selected" class="text-xl font-bold">Rp 0</h2>
                </div>
                <div class="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                    <p class="text-xs text-slate-400 mb-1">Total Bulan Ini</p>
                    <h2 id="total-month" class="text-xl font-bold text-slate-800">Rp 0</h2>
                </div>
                <div class="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                    <p class="text-xs text-slate-400 mb-1">Total Tahun Ini</p>
                    <h2 id="total-year" class="text-xl font-bold text-slate-800">Rp 0</h2>
                </div>
            </div>

            <div class="bg-white p-4 rounded-3xl border mb-6 flex items-center gap-3">
                <input type="date" id="spv-date" class="bg-slate-50 p-2 rounded-xl text-sm border-none focus:ring-2 focus:ring-indigo-500" value="${new Date().toISOString().split('T')[0]}">
                <button onclick="loadSPVAnalytics()" class="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold">Cek Data</button>
            </div>

            <div class="bg-white p-6 rounded-[2.5rem] border shadow-sm">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="font-bold text-slate-800">Riwayat Transaksi Terkini</h3>
                    <button onclick="loadRiwayatData()" class="text-indigo-600 text-xs font-bold">Refresh</button>
                </div>
                <div id="hist-list" class="space-y-4">
                    <p class="text-center text-slate-400 py-10">Mengambil data dari Firestore...</p>
                </div>
            </div>
        </div>
    `;

    // Jalankan fungsi pengambil data setelah HTML terpasang
    if (typeof loadSPVAnalytics === 'function') {
        loadSPVAnalytics();
    }
    if (typeof loadRiwayatData === 'function') {
        loadRiwayatData();
    }
    
    // Aktifkan ikon Lucide
    if (typeof lucide !== 'undefined') lucide.createIcons();
};
