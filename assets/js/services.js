// Fungsi Hapus Transaksi & Update Omset
window.deleteTransaction = async function(id) {
    if (!confirm("Hapus transaksi ini? Omset akan dihitung ulang.")) return;
    try {
        await getPublicCol('transactions').doc(id).delete();
        await loadRiwayatData(); 
        if (document.getElementById('spv-date')) await loadSPVAnalytics();
        alert("Terhapus!");
    } catch (e) { alert("Gagal: " + e.message); }
};

// Kalkulasi Analitik SPV
window.loadSPVAnalytics = async function() {
    const dateInput = document.getElementById('spv-date')?.value;
    const outlet = document.getElementById('spv-outlet-filter')?.value || 'ALL';
    const snap = await getPublicCol('transactions').get();
    let data = snap.docs.map(d => d.data());
    
    if(outlet !== 'ALL') data = data.filter(d => d.outlet === outlet);
    let dTot = 0, mTot = 0, yTot = 0;
    const now = new Date(dateInput);

    data.forEach(t => {
        if (!t.timestamp) return;
        const dt = t.timestamp.toDate();
        if(dt.toISOString().split('T')[0] === dateInput) dTot += t.total;
        if(dt.getMonth() === now.getMonth() && dt.getFullYear() === now.getFullYear()) mTot += t.total;
        if(dt.getFullYear() === now.getFullYear()) yTot += t.total;
    });

    document.getElementById('total-selected').innerText = `Rp ${dTot.toLocaleString()}`;
    document.getElementById('total-month').innerText = `Rp ${mTot.toLocaleString()}`;
    document.getElementById('total-year').innerText = `Rp ${yTot.toLocaleString()}`;
};
