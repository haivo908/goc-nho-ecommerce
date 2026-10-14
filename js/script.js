'use strict';

// Dữ liệu mẫu. Giá dùng số nguyên VND để tránh sai số tiền tệ.
const products = [
  { id: 'lamp', name: 'Đèn bàn Mầm', category: 'light', price: 249000, oldPrice: 289000, minDesk: 60, dimensions: 'Đế 14 × 14 cm · Cao 32 cm', material: 'Kim loại sơn mờ', image: 'lamp.svg', tag: 'ÁNH SÁNG ẤM', description: 'Đèn bàn nhỏ gọn với chụp xanh lá. Một điểm sáng ấm áp cho giờ đọc sách và những buổi học tối.', note: 'Minh họa đèn LED 5 W, ánh sáng ấm; thông số chưa phải sản phẩm thương mại.' },
  { id: 'stand', name: 'Giá laptop Nâng', category: 'organize', price: 189000, oldPrice: 0, minDesk: 80, dimensions: '26 × 22 × 12 cm', material: 'Gỗ tre', image: 'stand.svg', tag: 'GÓC BÀN GỌN', description: 'Nâng laptop để có thêm khoảng trống cho đồ dùng bên dưới. Thiết kế gỗ tre nhẹ nhàng cho góc làm việc.', note: 'Kiểm tra kích thước và trọng lượng laptop trước khi chọn; bản mẫu không chứng nhận công thái học.' },
  { id: 'tray', name: 'Khay bàn Gọn', category: 'organize', price: 99000, oldPrice: 119000, minDesk: 60, dimensions: '20 × 12 × 3 cm', material: 'Gỗ tre', image: 'tray.svg', tag: 'BÀN NHỎ 60 CM', description: 'Một nơi riêng cho bút, kẹp giấy và những món dễ thất lạc. Bàn gọn hơn mà không cần nhiều ngăn chứa.', note: 'Phụ kiện xuất hiện trong hình chỉ để minh họa.' },
  { id: 'timer', name: 'Đồng hồ Nhịp', category: 'focus', price: 159000, oldPrice: 0, minDesk: 60, dimensions: '8 × 8 × 4 cm', material: 'Nhựa ABS', image: 'timer.svg', tag: 'HỌC THEO NHỊP', description: 'Đồng hồ để bàn cho các phiên tập trung. Dành một khoảng thời gian rõ ràng cho việc học, rồi nghỉ ngắn.', note: 'Sản phẩm mẫu; hình hiển thị 25 phút là minh họa.' },
  { id: 'mat', name: 'Tấm lót Êm', category: 'organize', price: 229000, oldPrice: 269000, minDesk: 80, dimensions: '70 × 30 cm', material: 'Nỉ ép', image: 'mat.svg', tag: 'MẶT BÀN DỄ CHỊU', description: 'Tấm lót nỉ màu trầm tạo một vùng làm việc rõ ràng, đủ chỗ cho bàn phím và chuột.', note: 'Bàn cần rộng ít nhất 80 cm và sâu đủ cho tấm lót 30 cm.' },
  { id: 'notebook', name: 'Sổ Ý Tưởng', category: 'focus', price: 59000, oldPrice: 0, minDesk: 60, dimensions: 'A5 · 14,8 × 21 cm', material: 'Giấy 80 gsm · 80 trang', image: 'notebook.svg', tag: 'GHI LẠI ĐIỀU HAY', description: 'Sổ kẻ chấm để ghi chú bài học, phác thảo ý tưởng và lên kế hoạch cho một ngày vừa sức.', note: 'Giấy và số trang là dữ liệu giả lập để học cách trình bày thông số.' },
  { id: 'cable', name: 'Kẹp dây Nếp', category: 'organize', price: 39000, oldPrice: 0, minDesk: 60, dimensions: 'Bộ 3 kẹp · Mỗi kẹp 3 cm', material: 'Silicone', image: 'cable.svg', tag: 'CHI TIẾT NHỎ', description: 'Giữ đầu dây sạc trong tầm tay, giúp bàn bớt rối và tìm dây nhanh hơn.', note: 'Bộ kẹp minh họa; chưa có kết quả kiểm tra độ bám dính thực tế.' },
  { id: 'holder', name: 'Ống bút Mộc', category: 'organize', price: 79000, oldPrice: 99000, minDesk: 60, dimensions: '8 × 8 × 10 cm', material: 'Gỗ tre', image: 'holder.svg', tag: 'MỘT CHỖ CHO BÚT', description: 'Ống bút đơn giản, vừa với những đồ dùng thường xuyên. Giữ lại điều cần thiết ngay cạnh bạn.', note: 'Bút trong hình không thuộc sản phẩm mẫu.' }
];
const categoryNames = { light: 'Ánh sáng', organize: 'Sắp xếp', focus: 'Tập trung' };
const storageKey = 'goc-nho-cart-v1';
const maxQuantity = 20; // Giới hạn giao diện mẫu, không phải số tồn kho thực.
const state = { category: 'all', cart: [], compare: [], recommendation: [] };
const money = value => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
const findProduct = id => products.find(product => product.id === id);
const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase().trim();
const escapeHTML = text => String(text).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const imagePath = product => `assets/images/${product.image}`;
const $ = selector => document.querySelector(selector);
let toastTimer;
let storageWarningShown = false;

function notify(message) {
  clearTimeout(toastTimer);
  $('#toast').textContent = message;
  $('#toast').classList.add('visible');
  const activeDialog = document.querySelector('dialog[open]');
  if (activeDialog) {
    let feedback = activeDialog.querySelector('.dialog-feedback');
    if (!feedback) {
      feedback = document.createElement('p');
      feedback.className = 'dialog-feedback';
      feedback.setAttribute('role', 'status');
      activeDialog.append(feedback);
    }
    feedback.textContent = message;
  }
  toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 3500);
}

// Không tin dữ liệu từ localStorage: loại ID lạ, số lượng sai và gộp dòng trùng.
function sanitizeCart(value) {
  if (!Array.isArray(value)) return [];
  const merged = new Map();
  for (const item of value) {
    if (!item || !findProduct(item.id) || !Number.isInteger(item.quantity) || item.quantity < 1) continue;
    merged.set(item.id, Math.min(maxQuantity, (merged.get(item.id) || 0) + item.quantity));
  }
  return Array.from(merged, ([id, quantity]) => ({ id, quantity }));
}
function loadCart() {
  try { state.cart = sanitizeCart(JSON.parse(localStorage.getItem(storageKey) || '[]')); }
  catch { state.cart = []; }
}
function saveCart() {
  try { localStorage.setItem(storageKey, JSON.stringify(state.cart)); }
  catch {
    if (!storageWarningShown) {
      storageWarningShown = true;
      notify('Trình duyệt không cho lưu giỏ hàng. Bạn vẫn có thể mua thử trong phiên này.');
    }
  }
}
function getTotals(cart = state.cart) {
  const subtotal = cart.reduce((sum, item) => sum + findProduct(item.id).price * item.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= 300000 ? 0 : 25000;
  return { subtotal, shipping, total: subtotal + shipping };
}
function filterProducts() {
  const query = normalize($('#search').value);
  const size = $('#desk-size').value;
  const ceiling = $('#max-price').value;
  let result = products.filter(product =>
    (state.category === 'all' || product.category === state.category) &&
    (!query || normalize(`${product.name} ${categoryNames[product.category]} ${product.material} ${product.description}`).includes(query)) &&
    (size === 'all' || product.minDesk <= Number(size)) &&
    (ceiling === 'all' || product.price <= Number(ceiling))
  );
  switch ($('#sort').value) {
    case 'price-asc': result.sort((a, b) => a.price - b.price); break;
    case 'price-desc': result.sort((a, b) => b.price - a.price); break;
    case 'name': result.sort((a, b) => a.name.localeCompare(b.name, 'vi')); break;
  }
  return result;
}
function renderProducts() {
  const visible = filterProducts();
  $('#results-count').textContent = `${visible.length} / ${products.length} sản phẩm · Giá minh họa`;
  $('#empty-products').hidden = visible.length > 0;
  $('#product-grid').innerHTML = visible.map(product => {
    const discount = product.oldPrice > product.price ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
    return `<article class="product-card"><div class="product-image"><button type="button" data-detail="${product.id}" aria-label="Xem chi tiết ${escapeHTML(product.name)}"><img src="${imagePath(product)}" alt="Minh họa ${escapeHTML(product.name)}" width="400" height="400" loading="lazy"></button><span class="product-tag">${discount ? `GIẢM ${discount}%` : product.tag}</span></div><div class="product-info"><p class="product-meta">${categoryNames[product.category]} · Bàn từ ${product.minDesk} cm</p><h3 class="product-title"><button type="button" data-detail="${product.id}">${escapeHTML(product.name)}</button></h3><div class="price-line"><span class="price">${money(product.price)}</span>${discount ? `<del>${money(product.oldPrice)}</del>` : ''}</div><div class="product-actions"><button type="button" class="add-button" data-add="${product.id}" aria-label="Thêm ${escapeHTML(product.name)} vào giỏ">Thêm vào giỏ ＋</button><label class="compare-option"><input type="checkbox" data-compare="${product.id}" ${state.compare.includes(product.id) ? 'checked' : ''} aria-label="So sánh ${escapeHTML(product.name)}"><span>So sánh</span></label></div></div></article>`;
  }).join('');
}
function resetFilters() {
  $('#filters').reset();
  state.category = 'all';
  document.querySelectorAll('[data-category]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.category === 'all')));
  renderProducts();
}
function updateCart() {
  saveCart();
  $('#cart-count').textContent = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  renderCart();
}
function addToCart(id, quantity = 1, feedback = true) {
  const product = findProduct(id);
  if (!product || !Number.isInteger(quantity) || quantity < 1) return false;
  const item = state.cart.find(row => row.id === id);
  if ((item ? item.quantity : 0) + quantity > maxQuantity) {
    if (feedback) notify(`Bản mẫu giới hạn ${maxQuantity} món cho mỗi sản phẩm.`);
    return false;
  }
  if (item) item.quantity += quantity;
  else state.cart.push({ id, quantity });
  updateCart();
  if (feedback && !storageWarningShown) notify(`Đã thêm ${product.name} vào giỏ.`);
  return true;
}
function changeQuantity(id, delta) {
  const item = state.cart.find(row => row.id === id);
  if (!item) return;
  const next = item.quantity + delta;
  if (next > maxQuantity) { notify(`Tối đa ${maxQuantity} món mỗi sản phẩm trong bản mẫu.`); return; }
  if (next <= 0) state.cart = state.cart.filter(row => row.id !== id);
  else item.quantity = next;
  updateCart();
  // Render lại thay nút cũ; đưa focus về điều khiển cùng sản phẩm.
  const focusTarget = document.querySelector(`[data-quantity="${id}"][data-delta="${delta}"]:not(:disabled)`) || $('#checkout-button');
  focusTarget.focus();
}
function summaryHTML(totals) {
  return `<div class="summary-line"><span>Tạm tính</span><span>${money(totals.subtotal)}</span></div><div class="summary-line"><span>Giao hàng mẫu</span><span>${totals.shipping ? money(totals.shipping) : 'Miễn phí'}</span></div><div class="summary-line total"><span>Tổng cộng</span><span>${money(totals.total)}</span></div>`;
}
function renderCart() {
  const empty = state.cart.length === 0;
  $('#cart-items').innerHTML = empty ? '<div class="empty-state"><h3>Giỏ hàng đang trống</h3><p>Khám phá cửa hàng và chọn món đầu tiên cho góc của bạn.</p><button type="button" class="button secondary" data-browse>Khám phá sản phẩm</button></div>' : state.cart.map(item => {
    const product = findProduct(item.id);
    return `<div class="cart-item"><img src="${imagePath(product)}" alt="" width="65" height="65"><div><h3>${escapeHTML(product.name)}</h3><span class="price">${money(product.price)} / món</span><div class="quantity"><button type="button" data-quantity="${product.id}" data-delta="-1" aria-label="Giảm số lượng ${escapeHTML(product.name)}">−</button><span aria-label="Số lượng">${item.quantity}</span><button type="button" data-quantity="${product.id}" data-delta="1" ${item.quantity >= maxQuantity ? 'disabled' : ''} aria-label="Tăng số lượng ${escapeHTML(product.name)}">＋</button></div></div><div><strong class="price">${money(product.price * item.quantity)}</strong><br><button type="button" class="cart-remove" data-remove="${product.id}" aria-label="Xóa ${escapeHTML(product.name)} khỏi giỏ">Xóa</button></div></div>`;
  }).join('');
  $('#cart-summary').innerHTML = empty ? '' : `${summaryHTML(getTotals())}<p class="small">Quy tắc mẫu: miễn phí giao hàng từ 300.000 ₫; dưới mức này phí 25.000 ₫.</p>`;
  $('#checkout-button').disabled = empty;
}
function openDialog(id) {
  const dialog = $(id);
  dialog.querySelector('.dialog-feedback')?.remove();
  if (!dialog.open) dialog.showModal();
}
function showDetail(id) {
  const product = findProduct(id);
  if (!product) return;
  $('#product-detail').innerHTML = `<div class="detail-layout"><img src="${imagePath(product)}" alt="Minh họa ${escapeHTML(product.name)}" width="400" height="400"><div><p class="eyebrow">${categoryNames[product.category]}</p><h2 id="product-title">${escapeHTML(product.name)}</h2><p class="price">${money(product.price)}</p><p>${escapeHTML(product.description)}</p><ul class="specs"><li>Kích thước: ${escapeHTML(product.dimensions)}</li><li>Chất liệu: ${escapeHTML(product.material)}</li><li>Gợi ý: bàn rộng từ ${product.minDesk} cm</li></ul><button type="button" class="button primary" data-add="${product.id}">Thêm vào giỏ ＋</button><p class="small">${escapeHTML(product.note)}</p></div></div>`;
  openDialog('#product-dialog');
}
function updateCompare() {
  $('#compare-bar').hidden = state.compare.length === 0;
  $('#compare-count').textContent = `Đã chọn ${state.compare.length}/3 món để so sánh`;
  $('#open-compare').disabled = state.compare.length < 2;
}
function showCompare() {
  if (state.compare.length < 2) return;
  const chosen = state.compare.map(findProduct);
  const rows = [ ['Giá', p => money(p.price)], ['Công dụng', p => categoryNames[p.category]], ['Kích thước', p => p.dimensions], ['Chất liệu', p => p.material], ['Bàn tối thiểu', p => `${p.minDesk} cm`] ];
  $('#compare-content').innerHTML = `<table><caption>So sánh thông số minh họa. Các món khác công dụng có thể bổ sung cho nhau.</caption><thead><tr><th scope="col">Tiêu chí</th>${chosen.map(p => `<th scope="col">${escapeHTML(p.name)}</th>`).join('')}</tr></thead><tbody>${rows.map(([label, value]) => `<tr><th scope="row">${label}</th>${chosen.map(p => `<td>${escapeHTML(value(p))}</td>`).join('')}</tr>`).join('')}<tr><th scope="row">Chọn mua</th>${chosen.map(p => `<td><button type="button" class="add-button" data-add="${p.id}">Thêm ${escapeHTML(p.name)}</button></td>`).join('')}</tr></tbody></table>`;
  openDialog('#compare-dialog');
}
// Chọn tối đa một món mỗi công dụng, theo ưu tiên, không vượt ngân sách.
function recommend(size, budget) {
  const chosen = [];
  let remaining = budget;
  for (const category of ['light', 'organize', 'focus']) {
    const candidate = products.find(p => p.category === category && p.minDesk <= size && p.price <= remaining);
    if (candidate) { chosen.push(candidate); remaining -= candidate.price; }
  }
  return chosen;
}
function renderRecommendation() {
  state.recommendation = recommend(Number($('#finder-size').value), Number($('#finder-budget').value));
  if (!state.recommendation.length) { $('#finder-result').textContent = 'Chưa có bộ phù hợp. Thử tăng ngân sách.'; return; }
  const total = state.recommendation.reduce((sum, p) => sum + p.price, 0);
  $('#finder-result').innerHTML = `${state.recommendation.map(p => `<div class="recommend-item"><button type="button" class="plain-button" data-detail="${p.id}">${escapeHTML(p.name)}</button><span>${money(p.price)}</span></div>`).join('')}<div class="recommend-total"><span>${state.recommendation.length} món · Chưa gồm giao hàng</span><span>${money(total)}</span></div><button type="button" class="button secondary full-width" id="add-bundle">Thêm cả bộ vào giỏ</button><p class="small">Gợi ý ưu tiên ánh sáng → sắp xếp → tập trung; mỗi công dụng tối đa một món. Đây không phải tối ưu mọi tổ hợp hoặc tư vấn bằng AI.</p>`;
}
function addBundle() {
  if (!state.recommendation.length) return;
  if (state.recommendation.some(p => (state.cart.find(item => item.id === p.id)?.quantity || 0) >= maxQuantity)) { notify('Có món đã đạt giới hạn số lượng; hãy giảm số lượng trước khi thêm bộ.'); return; }
  state.recommendation.forEach(p => addToCart(p.id, 1, false));
  notify('Đã thêm bộ gợi ý vào giỏ.');
}
function startCheckout() {
  if (!state.cart.length) return;
  $('#cart-dialog').close();
  $('#checkout-form').reset();
  $('#checkout-form').hidden = false;
  $('#checkout-success').hidden = true;
  $('#checkout-summary').innerHTML = `${state.cart.map(item => `<div class="summary-line"><span>${escapeHTML(findProduct(item.id).name)} × ${item.quantity}</span><span>${money(findProduct(item.id).price * item.quantity)}</span></div>`).join('')}<p class="small">Tạm tính: ${money(getTotals().subtotal)}. Phí giao hàng tính theo cách nhận.</p>`;
  updateCheckoutTotal();
  openDialog('#checkout-dialog');
}
function updateCheckoutTotal() {
  const totals = getTotals();
  const pickup = $('#delivery-method').value === 'pickup';
  $('#checkout-total').textContent = `Tổng ${pickup ? 'nhận tại cửa hàng' : 'giao hàng'}: ${money(totals.subtotal + (pickup ? 0 : totals.shipping))}`;
}
const policies = {
  shipping: ['Giao hàng và đổi trả mẫu', '<p>Quy tắc minh họa: phí giao hàng 25.000 ₫, miễn phí cho giỏ từ 300.000 ₫. Nhận tại cửa hàng mẫu không có phí.</p><p>Concept đề xuất đổi trả trong 7 ngày nếu sản phẩm lỗi. Đây chưa phải cam kết của doanh nghiệp; cần thay bằng chính sách thật trước khi bán hàng.</p>'],
  privacy: ['Dữ liệu và quyền riêng tư', '<p>Website chỉ lưu mã sản phẩm và số lượng giỏ hàng trong localStorage của trình duyệt. Không yêu cầu tên, email, địa chỉ hoặc thông tin thanh toán.</p><p>Đặt hàng là mô phỏng trong trình duyệt. Dữ liệu giỏ có thể được xóa bằng cách xóa từng món hoặc xóa dữ liệu trang trong cài đặt trình duyệt.</p>'],
  help: ['Cách mua thử', '<p>1. Tìm sản phẩm hoặc chọn bộ theo kích thước bàn và ngân sách.</p><p>2. Mở chi tiết để đọc số đo; có thể chọn 2–3 món để so sánh.</p><p>3. Thêm vào giỏ, điều chỉnh số lượng và kiểm tra tổng tiền.</p><p>4. Chọn cách nhận, xác nhận bản mẫu và hoàn thành quy trình mô phỏng. Không có tiền hoặc đơn thật được gửi đi.</p>']
};

// Event delegation: một listener xử lý cả các nút được tạo sau khi render.
document.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.hasAttribute('data-close')) { button.closest('dialog').close(); return; }
  if (button.dataset.add) { addToCart(button.dataset.add); return; }
  if (button.dataset.detail) { showDetail(button.dataset.detail); return; }
  if (button.dataset.quantity) { changeQuantity(button.dataset.quantity, Number(button.dataset.delta)); return; }
  if (button.dataset.remove) {
    state.cart = state.cart.filter(item => item.id !== button.dataset.remove);
    updateCart();
    $('#cart-items button, #cart-dialog [data-close]').focus();
    notify('Đã xóa sản phẩm khỏi giỏ.'); return;
  }
  if (button.dataset.category) {
    state.category = button.dataset.category;
    document.querySelectorAll('[data-category]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    renderProducts(); return;
  }
  if (button.dataset.policy) {
    const policy = policies[button.dataset.policy];
    $('#policy-title').textContent = policy[0]; $('#policy-content').innerHTML = policy[1];
    openDialog('#policy-dialog'); return;
  }
  if (button.hasAttribute('data-browse')) { $('#cart-dialog').close(); location.hash = 'catalog'; $('#search').focus(); return; }
  if (button.id === 'add-bundle') addBundle();
});
document.addEventListener('change', event => {
  const input = event.target;
  if (!input.dataset.compare) return;
  if (input.checked && state.compare.length >= 3) { input.checked = false; notify('Bạn có thể so sánh tối đa 3 món.'); return; }
  state.compare = input.checked ? [...state.compare, input.dataset.compare] : state.compare.filter(id => id !== input.dataset.compare);
  updateCompare();
});
$('#filters').addEventListener('submit', event => event.preventDefault());
$('#filters').addEventListener('input', renderProducts);
$('#filters').addEventListener('change', renderProducts);
$('#reset-filters').addEventListener('click', resetFilters);
$('#empty-reset').addEventListener('click', resetFilters);
$('#open-cart').addEventListener('click', () => { renderCart(); openDialog('#cart-dialog'); });
$('#checkout-button').addEventListener('click', startCheckout);
$('#open-compare').addEventListener('click', showCompare);
$('#clear-compare').addEventListener('click', () => { state.compare = []; updateCompare(); document.querySelectorAll('[data-compare]').forEach(input => input.checked = false); });
$('#finder-form').addEventListener('submit', event => { event.preventDefault(); renderRecommendation(); });
$('#finder-form').addEventListener('change', () => { state.recommendation = []; $('#finder-result').innerHTML = '<p class="small">Lựa chọn đã đổi. Bấm “Tìm bộ phù hợp” để cập nhật gợi ý.</p>'; });
$('#delivery-method').addEventListener('change', updateCheckoutTotal);
$('#checkout-form').addEventListener('submit', event => {
  event.preventDefault();
  if (!event.target.reportValidity() || !state.cart.length) return;
  const totals = getTotals();
  const total = totals.subtotal + ($('#delivery-method').value === 'pickup' ? 0 : totals.shipping);
  $('#checkout-form').hidden = true;
  $('#checkout-success').hidden = false;
  $('#checkout-success').innerHTML = `<h3>Đã hoàn thành quy trình mẫu!</h3><p>Tổng minh họa: <strong>${money(total)}</strong>. Không thu tiền, không tạo đơn hàng thật. Giỏ hàng được giữ để bạn tiếp tục thử.</p><button type="button" class="button primary" data-close>Tiếp tục khám phá</button>`;
  $('#checkout-success button').focus();
});
// Đồng bộ giỏ khi một tab khác thay đổi dữ liệu.
window.addEventListener('storage', event => { if (event.key === storageKey) { loadCart(); $('#cart-count').textContent = state.cart.reduce((sum, item) => sum + item.quantity, 0); renderCart(); if ($('#checkout-dialog').open) { $('#checkout-dialog').close(); notify('Giỏ hàng đã đổi ở tab khác. Vui lòng kiểm tra lại.'); } } });
loadCart();
$('#cart-count').textContent = state.cart.reduce((sum, item) => sum + item.quantity, 0);
renderProducts();
renderCart();
updateCompare();
