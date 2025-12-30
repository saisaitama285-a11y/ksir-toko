document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('main-content');
    
    // Tentukan tampilan awal berdasarkan role
    if (currentUser.role === 'spv') {
        renderSPVDashboard(container);
    } else {
        renderSaos(container);
    }
    
    // Daftarkan fungsi ke window agar bisa diakses onclick HTML
    window.deleteTransaction = deleteTransaction;
    window.deleteSaos = deleteSaos;
    window.submitSaos = submitSaos;
    window.loadSPVAnalytics = loadSPVAnalytics;
});

// Helper Init Icon Lucide
function initIcons() {
    if (typeof lucide !== 'undefined') lucide.createIcons();
}
