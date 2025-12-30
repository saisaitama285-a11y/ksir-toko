function initIcons() { if (window.lucide) lucide.createIcons(); }

function initNavigation() {
    const nav = document.getElementById('nav-tabs');
    let tabs = (currentUser.role === 'kasir') ? [
        { id: 'pos', label: 'Kasir', icon: 'calculator' },
        { id: 'saos', label: 'Input Saos', icon: 'droplet' },
        { id: 'riwayat', label: 'Riwayat', icon: 'history' }
    ] : [
        { id: 'spv_dashboard', label: 'Monitoring', icon: 'bar-chart-3' },
        { id: 'spv_saos', label: 'Data Saos', icon: 'package' },
        { id: 'spv_traffic', label: 'Trafik', icon: 'clock' },
        { id: 'riwayat', label: 'Audit Transaksi', icon: 'shield-check' }
    ];
    nav.innerHTML = tabs.map(t => `<button onclick="switchView('${t.id}')" id="nav-${t.id}" class="flex items-center gap-2 px-6 py-3 rounded-2xl nav-btn bg-white text-slate-500 border border-slate-100 font-bold transition-all shadow-sm hover:shadow-md whitespace-nowrap"><i data-lucide="${t.icon}" class="w-4 h-4"></i> ${t.label}</button>`).join('');
    switchView(tabs[0].id);
}

function switchView(viewId) {
    const container = document.getElementById('content-area');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('nav-btn-active'));
    document.getElementById(`nav-${viewId}`)?.classList.add('nav-btn-active');
    
    if(viewId === 'pos') renderPOS(container);
    else if(viewId === 'saos') renderSaos(container);
    else if(viewId === 'riwayat') renderRiwayat(container);
    else if(viewId === 'spv_dashboard') renderSPVDashboard(container);
    else if(viewId === 'spv_saos') renderSPVSaos(container);
    else if(viewId === 'spv_traffic') renderSPVTraffic(container);
    initIcons();
}

window.onload = () => { initIcons(); };
