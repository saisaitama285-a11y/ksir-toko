function renderPOS(container) {
    container.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
            <div class="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
                ${[...MENU.roti, ...MENU.minuman].map(it => `
                    <button onclick="addToCart('${it.id}')" class="bg-white p-4 rounded-3xl border border-slate-200 text-left hover:border-blue-500 shadow-sm active:scale-95 transition">
                        <div class="text-[9px] text-slate-400 font-bold uppercase">${it.id.startsWith('r')?'Roti':'Minuman'}</div>
                        <div class="text-xs font-bold text-slate-800 mb-2 leading-tight">${it.name}</div>
                        <div class="text-blue-600 font-black text-sm">Rp ${it.price.toLocaleString()}</div>
                    </button>`).join('')}
            </div>
            <div class="lg:col-span-1 bg-white rounded-[2rem] border shadow-xl p-6 flex flex-col sticky-cart">
                <h3 class="font-black text-slate-900 text-sm mb-4">Ringkasan Pesanan</h3>
                <div id="cart-list" class="flex-1 overflow-y-auto space-y-2 mb-4 custom-scrollbar"></div>
                <div class="border-t pt-4">
                    <div class="flex justify-between font-black text-lg mb-4"><span>Total</span><span id="total-price" class="text-blue-600">Rp 0</span></div>
                    <div class="grid grid-cols-3 gap-2 mb-4">
                        <button onclick="setPaymentMethod('Tunai')" data-method="Tunai" class="pay-opt payment-opt-active border-2 border-slate-100 py-2 rounded-xl text-[10px] font-black transition">TUNAI</button>
                        <button onclick="setPaymentMethod('QRIS')" data-method="QRIS" class="pay-opt border-2 border-slate-100 py-2 rounded-xl text-[10px] font-black transition">QRIS</button>
                        <button onclick="setPaymentMethod('Debit')" data-method="Debit" class="pay-opt border-2 border-slate-100 py-2 rounded-xl text-[10px] font-black transition">DEBIT</button>
                    </div>
                    <div class="relative mb-2"><input type="number" id="cash-input" oninput="calcChange()" placeholder="Jumlah Bayar" class="w-full p-4 rounded-2xl bg-slate-50 border-none font-black text-lg"></div>
                    <div class="grid grid-cols-4 gap-2 mb-4">
                        <button onclick="setQuickCash('pas')" class="bg-slate-100 py-2 rounded-xl text-[10px] font-bold">PAS</button>
                        <button onclick="setQuickCash(10000)" class="bg-slate-100 py-2 rounded-xl text-[10px] font-bold">10k</button>
                        <button onclick="setQuickCash(50000)" class="bg-slate-100 py-2 rounded-xl text-[10px] font-bold">50k</button>
                        <button onclick="setQuickCash(100000)" class="bg-slate-100 py-2 rounded-xl text-[10px] font-bold">100k</button>
                    </div>
                    <div class="flex justify-between text-green-600 font-bold text-sm bg-green-50 p-3 rounded-xl mb-4"><span>Kembalian</span><span id="change-display">Rp 0</span></div>
                    <button id="pay-btn" onclick="processCheckout()" disabled class="w-full bg-blue-600 text-white py-4 rounded-2xl font-black shadow-lg">PROSES TRANSAKSI</button>
                </div>
            </div>
        </div>`;
    updateCartUI();
}

function updateCartUI() {
    const list = document.getElementById('cart-list');
    if(!list) return;
    list.innerHTML = currentCart.map((it, idx) => `
        <div class="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex justify-between items-center animate-fadeIn">
            <div class="flex-1 overflow-hidden"><div class="font-bold text-slate-800 text-xs truncate">${it.name}</div><div class="text-[9px] text-slate-500 font-medium">Rp ${it.price.toLocaleString()} x ${it.qty}</div></div>
            <div class="flex items-center gap-1.5 bg-white px-1 py-1 rounded-xl border">
                <button onclick="changeQty(${idx}, -1)" class="w-6 h-6 bg-slate-100 rounded text-slate-600 flex items-center justify-center">-</button>
                <span class="text-xs font-black min-w-[20px] text-center">${it.qty}</span>
                <button onclick="changeQty(${idx}, 1)" class="w-6 h-6 bg-slate-100 rounded text-slate-600 flex items-center justify-center">+</button>
            </div>
        </div>`).join('');
    const total = currentCart.reduce((a, b) => a + (b.price * b.qty), 0);
    document.getElementById('total-price').innerText = `Rp ${total.toLocaleString()}`;
    calcChange();
}

function showReceipt(data) {
    const date = data.timestamp?.toDate ? data.timestamp.toDate() : new Date();
    let text = `   ${data.outlet.toUpperCase()}\n--------------------------\n`;
    text += `Tgl : ${date.toLocaleString()}\nStaf: ${data.staff}\nTipe: ${data.method}\n--------------------------\n`;
    data.items.forEach(it => text += `${it.name.padEnd(18)} x${it.qty}\n             Rp ${(it.price * it.qty).toLocaleString()}\n`);
    text += `--------------------------\nTOTAL    : Rp ${data.total.toLocaleString()}\n`;
    text += `BAYAR    : Rp ${data.cash.toLocaleString()}\n`;
    text += `KEMBALI  : Rp ${data.change.toLocaleString()}\n--------------------------\n`;
    document.getElementById('receipt-content').innerHTML = `<pre class="whitespace-pre-wrap">${text}</pre>`;
    document.getElementById('receipt-modal').classList.replace('hidden', 'flex');
}

// Fungsi pembantu UI lainnya (addToCart, changeQty, setPaymentMethod, dll tetap sama)
function addToCart(id) {
    const item = [...MENU.roti, ...MENU.minuman].find(i => i.id === id);
    const existing = currentCart.find(i => i.id === id);
    if(existing) existing.qty++; else currentCart.push({...item, qty: 1});
    updateCartUI();
}
function changeQty(idx, delta) { currentCart[idx].qty += delta; if(currentCart[idx].qty <= 0) currentCart.splice(idx, 1); updateCartUI(); }
function setPaymentMethod(method) { selectedPayment = method; document.querySelectorAll('.pay-opt').forEach(btn => btn.classList.toggle('payment-opt-active', btn.dataset.method === method)); if (method !== 'Tunai') document.getElementById('cash-input').value = currentCart.reduce((a, b) => a + (b.price * b.qty), 0); calcChange(); }
function setQuickCash(amount) { const total = currentCart.reduce((a, b) => a + (b.price * b.qty), 0); document.getElementById('cash-input').value = amount === 'pas' ? total : amount; calcChange(); }
function calcChange() { const total = currentCart.reduce((a, b) => a + (b.price * b.qty), 0); const cash = parseInt(document.getElementById('cash-input')?.value || 0); document.getElementById('change-display').innerText = `Rp ${Math.max(0, cash - total).toLocaleString()}`; document.getElementById('pay-btn').disabled = (total === 0 || cash < total); }
function closeReceipt() { document.getElementById('receipt-modal').classList.replace('flex', 'hidden'); }
function logout() { location.reload(); }

// Render fungsi lainnya (renderSaos, renderRiwayat, renderSPVDashboard, dll)
function renderSaos(container) {
    container.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
            <div class="bg-white p-6 rounded-[2rem] border shadow-lg h-fit">
                <h3 class="text-lg font-black mb-6 text-slate-800">Laporan Stok Saos</h3>
                <div class="space-y-4">
                    <div><label class="text-[10px] font-bold text-slate-400 uppercase ml-2 mb-1 block">Pilih Varian Saos</label><select id="saos-name" class="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold">${SAOS_VARIANTS.map(s => `<option value="${s}">${s}</option>`).join('')}</select></div>
                    <div><label class="text-[10px] font-bold text-slate-400 uppercase ml-2 mb-1 block">Jumlah (Porsi/Botol)</label><input type="number" id="saos-qty" value="1" min="1" class="w-full p-4 bg-slate-50 border-none rounded-2xl font-black"></div>
                    <button onclick="submitSaos()" class="w-full bg-slate-900 text-white py-4 rounded-2xl font-black mt-4">SUBMIT DATA</button>
                </div>
            </div>
            <div class="bg-white p-6 rounded-[2rem] border shadow-lg overflow-hidden">
                <h3 class="text-sm font-black mb-4 flex items-center gap-2"><i data-lucide="history" class="w-4 h-4 text-blue-500"></i> Riwayat Input Hari Ini</h3>
                <div class="overflow-x-auto"><table class="w-full text-left text-xs"><thead class="bg-slate-50 text-slate-400 font-black uppercase tracking-tighter"><tr><th class="px-4 py-3">Jam</th><th class="px-4 py-3">Varian</th><th class="px-4 py-3 text-right">Qty</th><th class="px-4 py-3 text-center">Aksi</th></tr></thead><tbody id="local-saos-history" class="divide-y font-bold"></tbody></table></div>
            </div>
        </div>`;
    loadLocalSaosHistory();
}

async function loadLocalSaosHistory() {
    const table = document.getElementById('local-saos-history');
    if(!table) return;
    const today = new Date().toISOString().split('T')[0];
    const snap = await getPublicCol('saos_usage').get();
    let docs = snap.docs.map(d => ({ id: d.id, ...d.data() })).filter(d => d.outlet === currentUser.outlet && d.timestamp && d.timestamp.toDate().toISOString().split('T')[0] === today);
    docs.sort((a,b) => b.timestamp.seconds - a.timestamp.seconds);
    table.innerHTML = docs.map(d => `<tr class="hover:bg-slate-50"><td class="px-4 py-3 text-slate-400">${d.timestamp.toDate().toLocaleTimeString('id-ID', {hour:'2-digit', minute:'2-digit'})}</td><td class="px-4 py-3 uppercase">${d.name}</td><td class="px-4 py-3 text-right text-blue-600">${d.qty}</td><td class="px-4 py-3 text-center"><button onclick="deleteSaos('${d.id}')" class="text-red-500">🗑️</button></td></tr>`).join('') || '<tr><td colspan="4" class="text-center py-10">Belum ada input</td></tr>';
}
