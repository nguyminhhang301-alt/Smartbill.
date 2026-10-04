(() => {
  const $ = (s, root = document) => root.querySelector(s)
  const $$ = (s, root = document) => [...root.querySelectorAll(s)]
  const money = (n) => Number(n || 0).toLocaleString('vi-VN') + 'đ'
  const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[c]))
  const icon = (name, cls = 'ui-icon') => {
    const paths = {
      bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>',
      search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
      arrowUp:'<path d="M12 19V5"/><path d="m6 11 6-6 6 6"/>',
      receipt:'<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6M9 16h4"/>',
      chart:'<path d="M4 19V5M4 19h16"/><path d="m7 15 3-4 3 2 5-7"/>',
      wallet:'<path d="M4 6h15a2 2 0 0 1 2 2v10H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h13"/><path d="M16 13h5"/><circle cx="16" cy="13" r=".8"/>',
      cash:'<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M7 9h.01M17 15h.01"/>',
      tax:'<path d="M5 3h14v18H5z"/><path d="M8 8h8M8 12h8M8 16h5"/>',
      device:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 7h6M9 11h6M9 15h6"/>',
      settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.4 1.4-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.1h-2v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.4-1.4.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H8v-2h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.4-1.4.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V5h2v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.4 1.4-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.1v2h-.1a1.7 1.7 0 0 0-1.5 1Z"/>',
      help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 4 2c-1 .7-1.5 1.1-1.5 2.5M12 17h.01"/>',
      ai:'<path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"/><rect x="7" y="7" width="10" height="10" rx="3"/><path d="M10 11h.01M14 11h.01M10 14h4"/>',
      sync:'<path d="M20 11a8 8 0 0 0-14.9-3L3 10"/><path d="M3 5v5h5M4 13a8 8 0 0 0 14.9 3L21 14"/><path d="M21 19v-5h-5"/>',
      check:'<path d="m5 12 4 4L19 6"/>',
      info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
      mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
      money:'<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M7 8h.01M17 16h.01"/>',
      edit:'<path d="m4 20 4.5-1 9.9-9.9a2.1 2.1 0 0 0-3-3L6 16z"/><path d="m13.5 7.5 3 3"/>',
      download:'<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M4 21h16"/>',
      print:'<path d="M6 9V3h12v6"/><path d="M6 17H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v7H6z"/>',
      plus:'<path d="M12 5v14M5 12h14"/>',
      arrowRight:'<path d="M5 12h14M13 6l6 6-6 6"/>',
      close:'<path d="m6 6 12 12M18 6 6 18"/>'
    }
    return `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${paths[name] || paths.info}</svg>`
  }

  const memoryStore = {}
  const read = (key, fallback) => {
    try { const v = localStorage.getItem(key); if (v !== null) return JSON.parse(v) } catch {}
    try { const v = sessionStorage.getItem(key); if (v !== null) return JSON.parse(v) } catch {}
    return Object.prototype.hasOwnProperty.call(memoryStore, key) ? memoryStore[key] : fallback
  }
  const write = (key, value) => {
    memoryStore[key] = value
    try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
    try { sessionStorage.setItem(key, JSON.stringify(value)) } catch {}
  }

  const dict = {
    vi: {
      loginEyebrow:'TRỢ LÝ TÀI CHÍNH CHO HỘ KINH DOANH',loginTitle:'Quản lý tài chính đơn giản hơn cùng SmartBill',loginSubtitle:'Theo dõi doanh thu, chi phí, lợi nhuận và dữ liệu thuế trên cả điện thoại lẫn máy tính.',benefit1:'Doanh thu và lợi nhuận theo thời gian thực',benefit2:'Dùng tốt trên điện thoại và máy tính',benefit3:'Dữ liệu rõ ràng, dễ hiểu và an toàn',revenue:'Doanh thu',profit:'Lợi nhuận',madeForVietnam:'Phù hợp hộ kinh doanh Việt',login:'Đăng nhập',demoAccount:'Tài khoản demo: demo@smartbill.vn · 123456',emailLabel:'Số điện thoại hoặc email',passwordLabel:'Mật khẩu',remember:'Ghi nhớ tài khoản',forgot:'Quên mật khẩu?',createAccount:'Tạo tài khoản mới',setupTitle:'Thiết lập SmartBill',back:'Quay lại',continue:'Tiếp tục',tagline:'Tài chính gọn gàng, kinh doanh vững vàng',logout:'Đăng xuất',search:'Tìm kiếm',businessOwner:'Chủ hộ kinh doanh',chatPlaceholder:'Nhập câu hỏi…',
      dashboard:'Tổng quan',transactions:'Giao dịch',expenses:'Chi phí',reports:'Báo cáo',tax:'Hỗ trợ thuế',loan:'Hồ sơ vay vốn',device:'Thiết bị SmartBill',notifications:'Thông báo',assistant:'Trợ lý AI',settings:'Cài đặt',help:'Trợ giúp',
      greeting:'Xin chào, Hộ kinh doanh Minh Anh',dashboardSub:'Đây là tình hình tài chính của bạn hôm nay.',todayRevenue:'Doanh thu hôm nay',todayExpenses:'Chi phí hôm nay',estimatedProfit:'Lợi nhuận ước tính',transactionCount:'Số giao dịch',cashBalance:'Số dư tiền mặt',estimatedTax:'Thuế tạm tính',revenueTrend:'Xu hướng doanh thu',recentTransactions:'Giao dịch gần đây',paymentSplit:'Phân bổ thanh toán',taxReminder:'Nhắc việc thuế',taxReminderText:'Còn 5 ngày để hoàn thiện dữ liệu kỳ tháng 8.',transactionAlert:'Cảnh báo giao dịch',transactionAlertText:'Chi phí nhập hàng tăng 18% so với tuần trước.',askAi:'Hỏi trợ lý AI',connected:'Đang kết nối',
      transTitle:'Quản lý giao dịch',transSub:'Theo dõi mọi khoản thu từ tiền mặt, QR, chuyển khoản và ví điện tử.',addTransaction:'Thêm giao dịch',all:'Tất cả',filter:'Bộ lọc',code:'Mã giao dịch',dateTime:'Ngày & giờ',product:'Sản phẩm / dịch vụ',method:'Phương thức',amount:'Số tiền',status:'Trạng thái',recorded:'Đã ghi nhận',pending:'Chờ xử lý',cash:'Tiền mặt',qr:'QR',transfer:'Chuyển khoản',wallet:'Ví điện tử',edit:'Sửa',delete:'Xóa',save:'Lưu',cancel:'Hủy',note:'Ghi chú',
      expTitle:'Quản lý chi phí',expSub:'Ghi nhận chi phí và nhận dạng hóa đơn nhanh bằng AI.',addExpense:'Thêm chi phí',uploadInvoice:'Tải hóa đơn',monthlyExpense:'Tổng chi tháng này',expenseByCategory:'Chi phí theo danh mục',supplier:'Nhà cung cấp',inventory:'Nhập hàng',rent:'Tiền thuê',utilities:'Điện nước',salary:'Lương nhân viên',transport:'Vận chuyển',marketing:'Marketing',equipment:'Thiết bị',other:'Khác',detectInvoice:'Đang nhận dạng hóa đơn…',
      reportsTitle:'Báo cáo tài chính',reportsSub:'Xem doanh thu, chi phí, lợi nhuận và dòng tiền trong một nơi.',exportPdf:'Xuất PDF',exportExcel:'Xuất Excel',print:'In báo cáo',revenueReport:'Báo cáo doanh thu',expenseReport:'Báo cáo chi phí',profitReport:'Báo cáo lợi nhuận',cashflow:'Dòng tiền',bestSeller:'Sản phẩm bán chạy',
      taxTitle:'Hỗ trợ thuế',taxSub:'SmartBill sắp xếp dữ liệu và tạo ước tính sơ bộ để bạn dễ chuẩn bị hồ sơ.',taxableRevenue:'Doanh thu tính thuế ước tính',taxPeriod:'Kỳ tính thuế',nextDeadline:'Hạn tiếp theo',dataProgress:'Tiến độ chuẩn bị dữ liệu',reviewChecklist:'Danh sách cần kiểm tra',generateTax:'Tạo báo cáo hỗ trợ thuế',taxDisclaimer:'SmartBill không tự động nộp tờ khai chính thức. Nghĩa vụ thuế cần được kiểm tra theo quy định hiện hành.',
      loanTitle:'Hồ sơ vay vốn',loanSub:'Chuẩn bị bộ dữ liệu tài chính rõ ràng để làm việc với ngân hàng.',avgRevenue:'Doanh thu trung bình/tháng',avgProfit:'Lợi nhuận trung bình/tháng',revenueStability:'Độ ổn định doanh thu',operatingPeriod:'Thời gian hoạt động',cashflowScore:'Điểm dòng tiền',profileComplete:'Mức độ hoàn thiện hồ sơ',generateProfile:'Tạo hồ sơ tài chính',loanDisclaimer:'SmartBill không đảm bảo khoản vay được phê duyệt.',
      deviceTitle:'Thiết bị SmartBill Mini',deviceSub:'Theo dõi kết nối và đồng bộ dữ liệu từ thiết bị bán hàng.',connectionStatus:'Trạng thái kết nối',lastSync:'Đồng bộ lần cuối',powerStatus:'Nguồn điện',todayReceived:'Giao dịch nhận hôm nay',disconnect:'Ngắt kết nối',connect:'Kết nối',syncNow:'Đồng bộ ngay',testConnection:'Kiểm tra kết nối',
      notificationsTitle:'Thông báo',notificationsSub:'Theo dõi những thay đổi quan trọng trong hoạt động kinh doanh.',markAllRead:'Đánh dấu tất cả đã đọc',
      assistantTitle:'Trợ lý AI SmartBill',assistantSub:'Hỏi bằng ngôn ngữ đơn giản về doanh thu, chi phí, báo cáo và dữ liệu thuế.',assistantWelcome:'Xin chào! Tôi là trợ lý SmartBill. Tôi có thể giúp bạn quản lý doanh thu, chi phí, báo cáo và chuẩn bị dữ liệu thuế.',send:'Gửi',
      settingsTitle:'Cài đặt',settingsSub:'Quản lý hồ sơ, doanh nghiệp, bảo mật và gói dịch vụ.',personalProfile:'Thông tin cá nhân',businessInfo:'Thông tin hộ kinh doanh',paymentMethods:'Phương thức thanh toán',language:'Ngôn ngữ',security:'Bảo mật',backup:'Sao lưu dữ liệu',subscription:'Gói dịch vụ',active:'Đang sử dụng',getStarted:'Đăng ký ngay',
      helpTitle:'Trung tâm trợ giúp',helpSub:'Tìm câu trả lời nhanh hoặc gửi yêu cầu hỗ trợ.',faq:'Câu hỏi thường gặp',contactSupport:'Liên hệ hỗ trợ',subject:'Chủ đề',message:'Nội dung',sendRequest:'Gửi yêu cầu',
      today:'Hôm nay',week:'Tuần này',month:'Tháng này',year:'Năm nay',custom:'Tùy chọn',success:'Thành công'
    },
    en: {
      loginEyebrow:'FINANCIAL ASSISTANT FOR SMALL BUSINESSES',loginTitle:'Simpler financial management with SmartBill',loginSubtitle:'Track revenue, expenses, profit and tax-ready data on both mobile and desktop.',benefit1:'Real-time revenue and profit insights',benefit2:'Designed for both mobile and desktop',benefit3:'Clear, simple and secure financial data',revenue:'Revenue',profit:'Profit',madeForVietnam:'Built for Vietnamese small businesses',login:'Log in',demoAccount:'Demo account: demo@smartbill.vn · 123456',emailLabel:'Phone number or email',passwordLabel:'Password',remember:'Remember me',forgot:'Forgot password?',createAccount:'Create account',setupTitle:'Set up SmartBill',back:'Back',continue:'Continue',tagline:'Clear finances, stronger business',logout:'Log out',search:'Search',businessOwner:'Business owner',chatPlaceholder:'Type your question…',
      dashboard:'Dashboard',transactions:'Transactions',expenses:'Expenses',reports:'Reports',tax:'Tax Support',loan:'Loan Profile',device:'SmartBill Device',notifications:'Notifications',assistant:'AI Assistant',settings:'Settings',help:'Help Center',
      greeting:'Hello, Minh Anh Business',dashboardSub:'Here is your financial overview for today.',todayRevenue:"Today's revenue",todayExpenses:"Today's expenses",estimatedProfit:'Estimated profit',transactionCount:'Transactions',cashBalance:'Cash balance',estimatedTax:'Estimated tax',revenueTrend:'Revenue trend',recentTransactions:'Recent transactions',paymentSplit:'Payment distribution',taxReminder:'Tax reminder',taxReminderText:'5 days left to complete August data.',transactionAlert:'Transaction alert',transactionAlertText:'Inventory expenses are up 18% from last week.',askAi:'Ask AI assistant',connected:'Connected',
      transTitle:'Transaction Management',transSub:'Track income from cash, QR, bank transfer and e-wallets.',addTransaction:'Add Transaction',all:'All',filter:'Filters',code:'Transaction ID',dateTime:'Date & time',product:'Product / service',method:'Method',amount:'Amount',status:'Status',recorded:'Recorded',pending:'Pending',cash:'Cash',qr:'QR',transfer:'Bank transfer',wallet:'E-wallet',edit:'Edit',delete:'Delete',save:'Save',cancel:'Cancel',note:'Note',
      expTitle:'Expense Management',expSub:'Record expenses and scan invoices with AI.',addExpense:'Add Expense',uploadInvoice:'Upload invoice',monthlyExpense:'This month total',expenseByCategory:'Expenses by category',supplier:'Supplier',inventory:'Inventory',rent:'Rent',utilities:'Utilities',salary:'Employee salary',transport:'Transportation',marketing:'Marketing',equipment:'Equipment',other:'Other',detectInvoice:'Detecting invoice…',
      reportsTitle:'Financial Reports',reportsSub:'Review revenue, expenses, profit and cash flow in one place.',exportPdf:'Export PDF',exportExcel:'Export Excel',print:'Print report',revenueReport:'Revenue report',expenseReport:'Expense report',profitReport:'Profit report',cashflow:'Cash flow',bestSeller:'Best-selling item',
      taxTitle:'Tax Support',taxSub:'SmartBill organizes data and provides preliminary estimates for easier preparation.',taxableRevenue:'Estimated taxable revenue',taxPeriod:'Tax period',nextDeadline:'Next deadline',dataProgress:'Data preparation progress',reviewChecklist:'Review checklist',generateTax:'Generate tax support report',taxDisclaimer:'SmartBill does not officially submit tax declarations. Tax obligations must be verified under current regulations.',
      loanTitle:'Loan Profile',loanSub:'Prepare clear financial records for working with banks.',avgRevenue:'Average monthly revenue',avgProfit:'Average monthly profit',revenueStability:'Revenue stability',operatingPeriod:'Operating period',cashflowScore:'Cash-flow score',profileComplete:'Profile completeness',generateProfile:'Generate Financial Profile',loanDisclaimer:'SmartBill does not guarantee loan approval.',
      deviceTitle:'SmartBill Mini Device',deviceSub:'Monitor connectivity and sales-data synchronization.',connectionStatus:'Connection status',lastSync:'Last synchronization',powerStatus:'Power status',todayReceived:'Transactions received today',disconnect:'Disconnect',connect:'Connect',syncNow:'Sync now',testConnection:'Test connection',
      notificationsTitle:'Notifications',notificationsSub:'Track important business changes.',markAllRead:'Mark all as read',
      assistantTitle:'SmartBill AI Assistant',assistantSub:'Ask simple questions about revenue, expenses, reports and tax-ready data.',assistantWelcome:'Hello! I’m the SmartBill assistant. I can help you manage revenue, expenses, reports and tax-related data.',send:'Send',
      settingsTitle:'Settings',settingsSub:'Manage profile, business, security and subscription.',personalProfile:'Personal profile',businessInfo:'Business information',paymentMethods:'Payment methods',language:'Language',security:'Security',backup:'Data backup',subscription:'Subscription plan',active:'Active',getStarted:'Get started',
      helpTitle:'Help Center',helpSub:'Find quick answers or send a support request.',faq:'Frequently asked questions',contactSupport:'Contact support',subject:'Subject',message:'Message',sendRequest:'Send request',
      today:'Today',week:'This week',month:'This month',year:'This year',custom:'Custom',success:'Success'
    }
  }

  const defaultTransactions = [
    {id:'GD-240801',time:'08:42 · 04/08/2026',product:'Cà phê sữa × 2',method:'qr',amount:70000,status:'recorded'},
    {id:'GD-240802',time:'09:15 · 04/08/2026',product:'Bánh mì đặc biệt',method:'cash',amount:35000,status:'recorded'},
    {id:'GD-240803',time:'10:08 · 04/08/2026',product:'Đơn hàng tạp hóa',method:'transfer',amount:485000,status:'recorded'},
    {id:'GD-240804',time:'10:44 · 04/08/2026',product:'Combo đồ uống',method:'wallet',amount:125000,status:'pending'}
  ]
  const defaultExpenses = [
    {id:'CP-101',date:'04/08/2026',category:'inventory',supplier:'Công ty An Phú',amount:1250000},
    {id:'CP-102',date:'03/08/2026',category:'utilities',supplier:'Điện lực Hà Nội',amount:780000},
    {id:'CP-103',date:'02/08/2026',category:'transport',supplier:'Giao hàng nội thành',amount:240000}
  ]
  const defaultNotifications = [
    {id:1,type:'payment',titleVi:'Giao dịch QR mới',titleEn:'New QR transaction',textVi:'Đã ghi nhận 185.000đ từ mã QR cửa hàng.',textEn:'Recorded 185,000 VND from the store QR code.',time:'2 phút trước',read:false},
    {id:2,type:'warning',titleVi:'Chi phí tăng bất thường',titleEn:'Unusual expense increase',textVi:'Chi phí nhập hàng tuần này tăng 18%.',textEn:'Inventory expenses increased 18% this week.',time:'1 giờ trước',read:false},
    {id:3,type:'device',titleVi:'SmartBill Mini đã đồng bộ',titleEn:'SmartBill Mini synchronized',textVi:'128 giao dịch đã được đồng bộ thành công.',textEn:'128 transactions were synchronized successfully.',time:'3 giờ trước',read:true},
    {id:4,type:'tax',titleVi:'Nhắc hoàn thiện dữ liệu thuế',titleEn:'Tax data reminder',textVi:'Còn 5 ngày để kiểm tra dữ liệu kỳ tháng 8.',textEn:'5 days left to review August tax data.',time:'Hôm qua',read:false}
  ]

  const state = {
    lang: read('smartbill-lang', 'vi'),
    auth: read('smartbill-auth', false),
    route: location.hash.replace('#/','') || 'dashboard',
    transactions: read('smartbill-transactions', defaultTransactions),
    expenses: read('smartbill-expenses', defaultExpenses),
    notifications: read('smartbill-notifications', defaultNotifications),
    deviceConnected: read('smartbill-device-connected', true),
    profile: read('smartbill-profile', {name:'Nguyễn Minh Anh',phone:'0912 345 678',email:'minhanh@smartbill.vn',address:'Cầu Giấy, Hà Nội'}),
    onboardingStep: 0,
    dashboardPeriod: read('smartbill-dashboard-period', 'today'),
    chat: [{from:'bot',text:''}]
  }

  const navItems = [
    ['dashboard','dashboard','⌂'],
    ['transactions','transactions','↔'],
    ['expenses','expenses','◫'],
    ['reports','reports','▥'],
    ['tax','tax','▤'],
    ['loan','loan','▦'],
    ['device','device','▣'],
    ['notifications','notifications','◇'],
    ['assistant','assistant','✦'],
    ['settings','settings','⚙'],
    ['help','help','?']
  ]

  const navGroups = [
    {type:'single',route:'dashboard',key:'dashboard'},
    {type:'group',label:'Tài chính',items:[['transactions','transactions','Giao dịch'],['expenses','expenses','Chi phí']]},
    {type:'single',route:'reports',key:'reports'},
    {type:'group',label:'Thuế & vốn',items:[['tax','tax','Hỗ trợ thuế'],['loan','loan','Hồ sơ vay vốn']]},
    {type:'group',label:'Thiết bị',items:[['device','device','SmartBill Mini']]},
    {type:'group',label:'Hỗ trợ',items:[['assistant','assistant','Trợ lý AI'],['help','help','Trợ giúp']]},
  ]

  const t = key => dict[state.lang][key] || dict.vi[key] || key
  const methodLabel = m => ({cash:t('cash'),qr:t('qr'),transfer:t('transfer'),wallet:t('wallet')})[m]
  const categoryLabel = c => t(c)

  function toast(text) {
    const box = $('#toast'); box.textContent = '✓ ' + text; box.hidden = false
    clearTimeout(toast.timer); toast.timer = setTimeout(() => box.hidden = true, 2400)
  }

  function applyI18n() {
    document.documentElement.lang = state.lang
    $$('[data-i18n]').forEach(el => el.textContent = t(el.dataset.i18n))
    $$('[data-i18n-placeholder]').forEach(el => el.placeholder = t(el.dataset.i18nPlaceholder))
    $$('[data-lang-toggle]').forEach(btn => { btn.innerHTML = `<b>${state.lang.toUpperCase()}</b><span>${state.lang === 'vi' ? 'EN' : 'VI'}</span>` })
  }

  function setLanguage() {
    state.lang = state.lang === 'vi' ? 'en' : 'vi'; write('smartbill-lang', state.lang)
    applyI18n(); renderNav(); renderPage(); renderChat()
  }

  function showView(name) {
    $('#loginView').hidden = name !== 'login'
    $('#onboardingView').hidden = name !== 'onboarding'
    $('#appView').hidden = name !== 'app'
    document.body.classList.toggle('auth-screen-active', name === 'login')
    if (name !== 'login') {
      $('#authModal')?.setAttribute('hidden', '')
      $('#registerForm')?.setAttribute('hidden', '')
      $('#loginForm')?.removeAttribute('hidden')
      window.scrollTo(0, 0)
    } else {
      window.scrollTo(0, 0)
    }
  }

  function pageHeader(title, subtitle, actions = '') {
    return `<div class="page-header"><div><span class="eyebrow">SMARTBILL</span><h1>${title}</h1><p>${subtitle}</p></div>${actions ? `<div class="page-actions">${actions}</div>` : ''}</div>`
  }
  function iconFromSymbol(symbol) {
    const map = {'↗':'arrowUp','▤':'receipt','◒':'chart','▦':'chart','₫':'money','%':'tax','⌁':'device','↻':'sync','⚡':'device','✓':'check','▣':'receipt','◎':'settings','◇':'bell','▤':'receipt','文':'settings','☁':'sync','✦':'ai','✉':'mail','⇩':'download','▥':'chart','▦':'chart','▤':'receipt','?':'help','i':'info'}
    return icon(map[symbol] || 'info')
  }

  function summaryCard(label, value, note, tone='', icon='↗') {
    return `<article class="summary-card ${tone ? `tone-${tone}` : ''}"><div class="summary-icon">${iconFromSymbol(icon)}</div><div><p>${label}</p><h3>${value}</h3><span>${note}</span></div></article>`
  }
  function button(label, action, primary = true, icon = '') {
    return `<button class="${primary ? 'primary-button' : 'secondary-button'}" data-action="${action}">${label}</button>`
  }

  function renderNav() {
    const top = $('#topNav')
    if (top) {
      top.innerHTML = navGroups.map(group => {
        if (group.type === 'single') return `<button class="top-nav-item ${state.route === group.route ? 'active' : ''}" data-route="${group.route}">${t(group.key)}</button>`
        const active = group.items.some(([route]) => route === state.route)
        return `<div class="top-nav-group ${active ? 'active' : ''}"><button class="top-nav-item top-nav-parent" type="button">${group.label}</button><div class="top-nav-menu">${group.items.map(([route,key]) => `<button data-route="${route}" class="${state.route === route ? 'active' : ''}">${t(key)}</button>`).join('')}</div></div>`
      }).join('')
    }
    if ($('#mainNav')) $('#mainNav').innerHTML = navItems.map(([route,key,icon]) => `<button class="nav-link ${state.route === route ? 'active' : ''}" data-route="${route}"><span class="nav-icon">${icon}</span><span>${t(key)}</span></button>`).join('')
    const mobile = navItems.slice(0,4).map(([route,key,icon]) => `<button class="${state.route === route ? 'active' : ''}" data-route="${route}"><span>${icon}</span><small>${t(key)}</small></button>`).join('')
    if ($('#mobileNav')) $('#mobileNav').innerHTML = mobile
    $$('[data-route]').forEach(btn => btn.onclick = () => navigate(btn.dataset.route))
    $$('.top-nav-parent').forEach(btn => btn.onclick = e => { e.currentTarget.parentElement.classList.toggle('open') })
  }

  function navigate(route) {
    state.route = route; location.hash = '#/' + route; renderNav(); renderPage(); $('#sidebar').classList.remove('mobile-open'); window.scrollTo({top:0,behavior:'smooth'})
  }

  function svgLineChart() {
    return `<svg class="line-chart-svg" viewBox="0 0 700 270" preserveAspectRatio="none" aria-label="Revenue trend chart">
      <defs><linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4b7bec" stop-opacity=".35"/><stop offset="1" stop-color="#4b7bec" stop-opacity=".02"/></linearGradient></defs>
      ${[50,100,150,200].map(y=>`<line class="grid" x1="0" y1="${y}" x2="700" y2="${y}"/>`).join('')}
      <path class="area" d="M0,210 C80,190 100,140 180,160 S280,90 350,120 S440,60 520,90 S620,25 700,45 L700,270 L0,270 Z"/>
      <path class="line" d="M0,210 C80,190 100,140 180,160 S280,90 350,120 S440,60 520,90 S620,25 700,45"/>
      ${[[0,210],[180,160],[350,120],[520,90],[700,45]].map(([x,y])=>`<circle class="dot" cx="${x}" cy="${y}" r="6"/>`).join('')}
    </svg>`
  }

  function financeShowcase() {
    const slides = [
      {title:'Không gian cửa hàng thực tế',text:'Hình ảnh cửa hàng và quầy bán hàng giúp giao diện SmartBill gần với bối cảnh hộ kinh doanh hơn.',image:'assets/images/smartbill-finance.jpg',source:'Unsplash · cửa hàng bán lẻ tại Việt Nam'},
      {title:'Quản lý chi tiêu trực quan',text:'Theo dõi doanh thu, chi phí và các khoản thanh toán trong cùng một giao diện.',image:'assets/images/smartbill-analytics.jpg',source:'Unsplash · personal finance'},
      {title:'Thanh toán và giao dịch',text:'Hình ảnh giao dịch thực tế giúp khu vực tổng quan bớt khô cứng và dễ hình dung hơn.',image:'assets/images/smartbill-dashboard.jpg',source:'Ảnh dashboard SmartBill'}
    ]
    return `<section class="finance-showcase"><div class="showcase-head"><div><span class="eyebrow">SMARTBILL HOME</span><h2>Quản lý tài chính gọn gàng hơn mỗi ngày</h2><p>Lướt ngang để xem các hình ảnh thực tế được đưa vào giao diện SmartBill.</p></div><div class="showcase-controls"><button data-showcase-prev aria-label="Ảnh trước">‹</button><button data-showcase-next aria-label="Ảnh sau">›</button></div></div><div class="finance-track">${slides.map((s,i)=>`<article class="finance-slide"><img src="${s.image}" alt="${escapeHtml(s.title)}" loading="${i?'lazy':'eager'}"><div class="finance-slide-overlay"><span>0${i+1}</span><div><h3>${s.title}</h3><p>${s.text}</p><small>Nguồn hình: ${s.source}</small></div></div></article>`).join('')}</div><div class="showcase-hint">Kéo sang trái / phải để xem thêm <span>→</span></div></section>`
  }

  function mediaShowcase() {
    return `<section class="media-showcase"><div class="showcase-head"><div><span class="eyebrow">SMARTBILL MEDIA</span><h2>Hình ảnh minh họa thực tế</h2><p class="media-intro">Hình ảnh được đóng gói trực tiếp trong website để khi đưa lên GitHub Pages không phụ thuộc video hay website bên ngoài.</p></div></div><div class="media-grid"><article class="media-card media-photo"><img src="assets/images/smartbill-finance.jpg" alt="Quản lý tài chính" loading="lazy"><div><span>Hình ảnh tài chính</span><h3>Lập kế hoạch tài chính</h3><p>Minh họa cho việc theo dõi số liệu, chi phí và chứng từ.</p></div></article><article class="media-card media-photo"><img src="assets/images/smartbill-analytics.jpg" alt="Phân tích dữ liệu" loading="lazy"><div><span>Hình ảnh phân tích</span><h3>Phân tích dữ liệu</h3><p>Minh họa khu vực báo cáo và theo dõi xu hướng.</p></div></article><article class="media-card media-photo"><img src="assets/images/smartbill-dashboard.jpg" alt="Dashboard SmartBill" loading="lazy"><div><span>Giao diện SmartBill</span><h3>Quản lý trên một giao diện</h3><p>Hình ảnh thương hiệu được dùng trực tiếp từ thư mục assets.</p></div></article></div></section>`
  }

  function videoAccent(title, text, file, label='Video trực quan') {
    const imageFile = file.includes('analytics') ? 'assets/images/smartbill-analytics.jpg' : 'assets/images/smartbill-finance.jpg'; return `<article class="video-accent image-accent"><div class="video-accent-media"><img src="${imageFile}" alt="${escapeHtml(title)}" loading="lazy"></div><div class="video-accent-copy"><span class="eyebrow">${label}</span><h3>${title}</h3><p>${text}</p></div></article>`
  }

  function reportVideoBlock() {
    return `<section class="video-accent-row">${videoAccent('Phân tích dữ liệu tài chính trực quan','Theo dõi xu hướng và biến động qua hình ảnh chuyển động, giúp khu vực báo cáo bớt khô cứng.','smartbill-analytics.mp4','BÁO CÁO SMARTBILL')}<div class="video-accent-note panel"><span class="summary-icon">${icon('chart')}</span><div><h3>Đọc báo cáo nhanh hơn</h3><p>Biểu đồ và hình ảnh minh họa được đặt cạnh nhau để người dùng dễ hình dung doanh thu, chi phí và dòng tiền.</p></div></div></section>`
  }

  function siteFooter() {
    return `<footer class="site-footer"><div class="site-footer-main"><div class="site-footer-brand"><div class="footer-brand-row"><span class="brand-mark">SB</span><div><strong>SmartBill</strong><small>Quản lý tài chính cho hộ kinh doanh</small></div></div><p>Nền tảng demo giúp theo dõi doanh thu, chi phí, lợi nhuận, thuế và dòng tiền trong một nơi.</p></div><div><h3>Điều hướng</h3><a href="#/dashboard" data-route="dashboard">Tổng quan</a><a href="#/transactions" data-route="transactions">Giao dịch</a><a href="#/reports" data-route="reports">Báo cáo</a><a href="#/loan" data-route="loan">Thuế & vốn</a></div><div><h3>Hỗ trợ</h3><a href="#/device" data-route="device">SmartBill Mini</a><a href="#/assistant" data-route="assistant">Trợ lý AI</a><a href="#/help" data-route="help">Trung tâm trợ giúp</a><a href="#/settings" data-route="settings">Cài đặt</a></div><div><h3>Liên hệ</h3><p>Hà Nội, Việt Nam</p><p>Email: support@smartbill.vn</p><p>Hỗ trợ: 08:00 – 22:00</p></div></div><div class="site-footer-bottom"><span>© 2026 SmartBill · Bản demo quản lý tài chính</span><span>Dữ liệu minh họa phục vụ trình diễn giao diện</span></div></footer>`
  }

  function dashboardPage() {
    const recent = state.transactions.slice(0,4).map(x => `<div><span class="list-icon">${icon('receipt')}</span><div><strong>${escapeHtml(x.product)}</strong><small>${x.time} · ${x.id}</small></div><b>${money(x.amount)}</b></div>`).join('')
    return `${financeShowcase()}${pageHeader(t('greeting'),t('dashboardSub'),`<div class="segmented" data-period-switch><button data-period="today" class="${state.dashboardPeriod==='today'?'active':''}">${t('today')}</button><button data-period="week" class="${state.dashboardPeriod==='week'?'active':''}">${t('week')}</button><button data-period="month" class="${state.dashboardPeriod==='month'?'active':''}">${t('month')}</button></div>`)}
      <section class="summary-grid">${summaryCard(t('todayRevenue'),'12.840.000đ','+14,2%','','↗')}${summaryCard(t('todayExpenses'),'4.320.000đ','-3,1%','orange','▤')}${summaryCard(t('estimatedProfit'),'8.520.000đ','+22,8%','navy','◒')}${summaryCard(t('transactionCount'),'128','+16 giao dịch','aqua','▦')}${summaryCard(t('cashBalance'),'16.750.000đ','Đã đối soát','gray','₫')}${summaryCard(t('estimatedTax'),'642.000đ','Ước tính sơ bộ','orange','%')}</section>
      <section class="dashboard-grid">
        <article class="panel"><div class="panel-head"><div><h2>${t('revenueTrend')}</h2><p data-period-label>${state.dashboardPeriod==='week'?'7 ngày gần nhất · triệu đồng':state.dashboardPeriod==='month'?'Tháng hiện tại · triệu đồng':'Hôm nay · triệu đồng'}</p></div><span class="positive-pill">+18,6%</span></div>${svgLineChart()}</article>
        <article class="panel"><div class="panel-head"><div><h2>${t('paymentSplit')}</h2><p>${t('today')}</p></div></div><div class="donut" style="width:170px;height:170px;border-radius:50%;margin:10px auto;background:conic-gradient(#173c91 0 44%,#6f8fd8 44% 71%,#102b67 71% 92%,#cbd5e1 92%);position:relative"><i style="position:absolute;inset:38px;background:white;border-radius:50%"></i></div><div class="legend"><span><i style="background:#173c91"></i>QR <strong>44%</strong></span><span><i style="background:#6f8fd8"></i>${t('cash')} <strong>27%</strong></span><span><i style="background:#102b67"></i>Bank <strong>21%</strong></span><span><i style="background:#cbd5e1"></i>Wallet <strong>8%</strong></span></div></article>
        <article class="panel"><div class="panel-head"><div><h2>${t('recentTransactions')}</h2><p>SmartBill Mini</p></div><button class="secondary-button compact-all" data-route="transactions">${t('all')}</button></div><div class="compact-list">${recent}</div></article>
        <article class="panel insight-panel"><div class="insight-icon">${icon('ai')}</div><h2>${t('askAi')}</h2><p>“Tuần này chi phí nào tăng mạnh nhất?”</p><button class="primary-button small" data-route="assistant">${t('assistant')}</button></article>
        <article class="panel status-panel"><div class="panel-head"><h2>SmartBill Mini</h2><span class="status-badge success">${t('connected')}</span></div><div class="device-mini"><div class="device-shape">SB</div><div><strong>SmartBill Mini 01</strong><span>Đồng bộ 2 phút trước</span></div></div><div class="status-bars"><span style="width:86%"></span></div></article>
        <article class="panel notice-card"><span class="notice-dot warning"></span><div><h3>${t('taxReminder')}</h3><p>${t('taxReminderText')}</p></div></article>
        <article class="panel notice-card"><span class="notice-dot danger"></span><div><h3>${t('transactionAlert')}</h3><p>${t('transactionAlertText')}</p></div></article>
      </section>${mediaShowcase()}`
  }

  function transactionRows(list) {
    return list.map(x => `<tr><td><strong>${x.id}</strong></td><td>${x.time}</td><td><div class="table-title"><span class="list-icon">${icon('receipt')}</span>${escapeHtml(x.product)}</div></td><td><span class="method-pill ${x.method}">${methodLabel(x.method)}</span></td><td><strong>${money(x.amount)}</strong></td><td><span class="status-badge ${x.status === 'recorded' ? 'success' : 'pending'}">${t(x.status)}</span></td><td><div class="row-actions"><button data-edit-transaction="${x.id}">✎</button><button data-delete-transaction="${x.id}">⌫</button></div></td></tr>`).join('')
  }
  function transactionCards(list) {
    return list.map(x => `<article class="data-mobile-card"><header><strong>${escapeHtml(x.product)}</strong><b>${money(x.amount)}</b></header><dl><div><dt>${t('code')}</dt><dd>${x.id}</dd></div><div><dt>${t('method')}</dt><dd>${methodLabel(x.method)}</dd></div><div><dt>${t('dateTime')}</dt><dd>${x.time}</dd></div><div><dt>${t('status')}</dt><dd>${t(x.status)}</dd></div></dl><div class="row-actions"><button data-edit-transaction="${x.id}">✎ ${t('edit')}</button><button data-delete-transaction="${x.id}">⌫ ${t('delete')}</button></div></article>`).join('')
  }
  function transactionsPage() {
    return `${pageHeader(t('transTitle'),t('transSub'),button(t('addTransaction'),'add-transaction',true,'＋'))}
      <section class="toolbar panel"><label class="search-field"><span>⌕</span><input id="transactionSearch" placeholder="${t('search')}"></label><select id="transactionMethod"><option value="all">${t('all')}</option><option value="cash">${t('cash')}</option><option value="qr">QR</option><option value="transfer">${t('transfer')}</option><option value="wallet">${t('wallet')}</option></select><button class="secondary-button">☷ ${t('filter')}</button></section>
      <section class="panel table-panel desktop-table"><div class="table-responsive"><table><thead><tr><th>${t('code')}</th><th>${t('dateTime')}</th><th>${t('product')}</th><th>${t('method')}</th><th>${t('amount')}</th><th>${t('status')}</th><th></th></tr></thead><tbody id="transactionTableBody">${transactionRows(state.transactions)}</tbody></table></div></section><section id="transactionCardList" class="mobile-card-list">${transactionCards(state.transactions)}</section>`
  }

  function expenseRows(list) {
    return list.map(x=>`<div><span class="list-icon orange">${icon('receipt')}</span><div><strong>${categoryLabel(x.category)}</strong><small>${escapeHtml(x.supplier)} · ${x.date}</small></div><b>${money(x.amount)}</b><button class="icon-button" data-delete-expense="${x.id}">⌫</button></div>`).join('')
  }
  function expensesPage() {
    const total = state.expenses.reduce((a,b)=>a+b.amount,0)
    return `${pageHeader(t('expTitle'),t('expSub'),`${button(t('uploadInvoice'),'scan-invoice',false,'⇧')}${button(t('addExpense'),'add-expense',true,'＋')}`)}
      <section class="two-col-grid"><article class="panel metric-hero aqua-bg"><span>${t('monthlyExpense')}</span><h2>${money(total)}</h2><p>12,4% doanh thu tháng</p><div class="meter"><i style="width:62%"></i></div></article><article class="panel"><div class="panel-head"><div><h2>${t('expenseByCategory')}</h2><p>Tháng 8/2026</p></div></div><div class="bar-chart-css" style="height:170px"><div><i style="--a:86%;--b:0"></i><span>${t('inventory')}</span></div><div><i style="--a:55%;--b:0"></i><span>${t('utilities')}</span></div><div><i style="--a:34%;--b:0"></i><span>${t('transport')}</span></div><div><i style="--a:25%;--b:0"></i><span>${t('other')}</span></div></div></article></section>
      <section class="panel"><div class="panel-head"><label class="search-field"><span>⌕</span><input id="expenseSearch" placeholder="${t('search')}"></label></div><div id="expenseList" class="expense-list">${expenseRows(state.expenses)}</div></section>`
  }

  function reportTabContent(tab='revenue') {
    const common = `<div class="report-insight"><span class="eyebrow">SMARTBILL ANALYTICS</span><h2>${tab==='expense'?'Phân tích chi phí':tab==='profit'?'Phân tích lợi nhuận':tab==='cash'?'Theo dõi dòng tiền':'Tổng quan doanh thu'}</h2><p>${tab==='expense'?'Theo dõi nhóm chi phí, tỷ trọng và xu hướng phát sinh để kiểm soát ngân sách.':tab==='profit'?'Đối chiếu doanh thu với chi phí vận hành để theo dõi biên lợi nhuận theo tháng.':tab==='cash'?'Quan sát tiền vào, tiền ra và số dư cuối kỳ để chủ động kế hoạch thanh toán.':'Theo dõi doanh thu theo tháng, nhóm sản phẩm và tốc độ tăng trưởng của hộ kinh doanh.'}</p></div>`
    if(tab==='expense') return `${common}<section class="two-col-grid"><article class="panel"><div class="panel-head"><div><h2>Chi phí theo nhóm</h2><p>Đơn vị: triệu đồng · 7 tháng</p></div><span class="positive-pill">-8,4%</span></div><div class="report-bars expense-bars">${[['Nhập hàng',82],['Mặt bằng',48],['Nhân sự',36],['Điện nước',24],['Khác',18]].map(([l,v])=>`<div><span>${l}</span><i style="height:${v}%"></i><b>${v}tr</b></div>`).join('')}</div></article><article class="panel"><div class="panel-head"><div><h2>Tỷ trọng chi phí</h2><p>Phân bổ theo nhóm</p></div></div><div class="report-donut expense-donut"><div><strong>218tr</strong><small>Tổng chi phí</small></div></div><div class="legend"><span><i style="background:#173c91"></i>Nhập hàng <strong>38%</strong></span><span><i style="background:#6f8fd8"></i>Mặt bằng <strong>22%</strong></span><span><i style="background:#91a7d9"></i>Nhân sự <strong>18%</strong></span><span><i style="background:#cbd5e1"></i>Khác <strong>22%</strong></span></div></article></section><section class="panel report-table"><h2>Chỉ số kiểm soát chi phí</h2><div class="report-kpis"><div><span>Chi phí/doanh thu</span><strong>51,5%</strong></div><div><span>Chi phí tăng cao nhất</span><strong>Nhập hàng</strong></div><div><span>Ngân sách còn lại</span><strong>32 triệu</strong></div></div></section>`
    if(tab==='profit') return `${common}<section class="two-col-grid"><article class="panel"><div class="panel-head"><div><h2>Doanh thu và lợi nhuận</h2><p>Đơn vị: triệu đồng</p></div><span class="positive-pill">Biên 48,5%</span></div><div class="profit-chart"><div class="profit-line revenue-line"></div><div class="profit-line profit-line-main"></div><div class="profit-axis"><span>T1</span><span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span><span>T7</span></div></div><div class="chart-key"><span><i class="key-revenue"></i>Doanh thu</span><span><i class="key-profit"></i>Lợi nhuận</span></div></article><article class="panel"><div class="panel-head"><div><h2>Biên lợi nhuận</h2><p>So sánh theo tháng</p></div></div><div class="report-bars margin-bars">${[['T1',38],['T2',41],['T3',43],['T4',40],['T5',46],['T6',47],['T7',48.5]].map(([l,v])=>`<div><span>${l}</span><i style="height:${v*1.65}%"></i><b>${v}%</b></div>`).join('')}</div></article></section><section class="panel report-table"><h2>Đánh giá nhanh</h2><div class="report-kpis"><div><span>Lợi nhuận kỳ này</span><strong>205 triệu</strong></div><div><span>Tăng trưởng lợi nhuận</span><strong>+18,7%</strong></div><div><span>Biên lợi nhuận</span><strong>48,5%</strong></div></div></section>`
    if(tab==='cash') return `${common}<section class="two-col-grid"><article class="panel"><div class="panel-head"><div><h2>Tiền vào và tiền ra</h2><p>Đơn vị: triệu đồng · 7 ngày</p></div><span class="positive-pill">+42 triệu</span></div>${svgCashflowChart()}</article><article class="panel"><div class="panel-head"><div><h2>Số dư cuối ngày</h2><p>Theo dõi khả năng thanh toán</p></div></div><div class="cash-balance"><strong>16.750.000đ</strong><span>+12,6% so với kỳ trước</span></div><div class="cash-progress"><span style="width:76%"></span></div><p class="chart-note">Mức dự phòng mục tiêu: 22 triệu đồng</p></article></section><section class="panel report-table"><h2>Lịch sử dòng tiền</h2><div class="report-kpis"><div><span>Tiền vào</span><strong class="text-positive">+312 triệu</strong></div><div><span>Tiền ra</span><strong>−270 triệu</strong></div><div><span>Dòng tiền thuần</span><strong class="text-positive">+42 triệu</strong></div></div></section>`
    return `${common}<section class="two-col-grid"><article class="panel"><div class="panel-head"><div><h2>Doanh thu theo tháng</h2><p>Đơn vị: triệu đồng</p></div><span class="positive-pill">+19,2%</span></div>${svgLineChart()}</article><article class="panel"><div class="panel-head"><div><h2>Doanh thu và chi phí</h2><p>So sánh theo tháng</p></div></div><div class="bar-chart-css">${['T1','T2','T3','T4','T5','T6','T7'].map((m,i)=>`<div><i style="--a:${45+i*7}%"></i><i class="alt" style="--b:${28+i*4}%"></i><span>${m}</span></div>`).join('')}</div></article></section>`
  }
  function svgCashflowChart(){ return `<svg class="line-chart-svg" viewBox="0 0 700 270" preserveAspectRatio="none" aria-label="Cash flow chart"><g class="cash-grid">${[50,100,150,200].map(y=>`<line x1="0" y1="${y}" x2="700" y2="${y}"/>`).join('')}</g><path class="cash-in" d="M0,180 C90,160 110,90 180,120 S280,70 350,100 S450,55 520,80 S630,30 700,45"/><path class="cash-out" d="M0,220 C90,210 110,170 180,185 S280,145 350,160 S450,120 520,135 S630,95 700,105"/></svg><div class="chart-key"><span><i class="key-revenue"></i>Tiền vào</span><span><i class="key-profit"></i>Tiền ra</span></div>` }
  function reportsPage() {
    return `${pageHeader(t('reportsTitle'),t('reportsSub'),`${button(t('exportPdf'),'export-pdf',false,'⇩')}${button(t('exportExcel'),'export-excel',false,'▦')}${button(t('print'),'print-report',true,'▤')}`)}${reportVideoBlock()}<div class="page-tabs report-tabs"><button class="page-tab active" data-report-tab="revenue">${t('revenueReport')}</button><button class="page-tab" data-report-tab="expense">${t('expenseReport')}</button><button class="page-tab" data-report-tab="profit">${t('profitReport')}</button><button class="page-tab" data-report-tab="cash">${t('cashflow')}</button></div><div id="reportContent">${reportTabContent('revenue')}</div>`
  }

  function taxPage() {
    const checks=[['Kiểm tra thông tin hộ kinh doanh',true],['Kiểm tra doanh thu',true],['Kiểm tra chi phí',true],['Kiểm tra hóa đơn điện tử',false],['Đối chiếu dữ liệu ngân hàng',false]]
    return `${pageHeader(t('taxTitle'),t('taxSub'),button(t('generateTax'),'generate-tax',true,'▤'))}
      <section class="tax-media-row">${videoAccent('Đối chiếu dữ liệu trước kỳ khai thuế','Một góc nhìn trực quan về việc kiểm tra số liệu, chứng từ và các khoản thu chi trước khi lập báo cáo.','smartbill-analytics.mp4','THUẾ & ĐỐI SOÁT')}</section>
      <section class="summary-grid report-summary">${summaryCard(t('taxableRevenue'),'68.500.000đ','Tháng 8/2026')}${summaryCard(t('estimatedTax'),'1.370.000đ','Ước tính sơ bộ','orange')}${summaryCard(t('taxPeriod'),'08/2026','Theo tháng','navy')}${summaryCard(t('nextDeadline'),'20/09/2026','Còn 47 ngày','aqua')}</section>
      <section class="two-col-grid"><article class="panel"><div class="panel-head"><div><h2>${t('dataProgress')}</h2><p>3/5 hạng mục đã hoàn thành</p></div><strong>72%</strong></div><div class="progress-large"><span style="width:72%"></span></div><div class="check-list">${checks.map(([x,d])=>`<div><span style="color:${d?'#173c91':'#94a3b8'}">${d?'✓':'○'}</span><span>${x}</span>${d?'<small>Hoàn tất</small>':''}</div>`).join('')}</div></article><article class="panel soft-panel"><div class="soft-icon">i</div><h2>Lưu ý quan trọng</h2><p>${t('taxDisclaimer')}</p><ul><li>Dữ liệu tổng hợp từ giao dịch và chi phí đã ghi nhận.</li><li>Số thuế chỉ là ước tính tham khảo.</li><li>Hãy kiểm tra với chuyên gia hoặc cơ quan có thẩm quyền.</li></ul><button class="secondary-button" data-action="download-tax">Tải tài liệu hỗ trợ</button></article></section>`
  }

  function loanPage() {
    const docs=[['Thông tin hộ kinh doanh',true],['Báo cáo doanh thu',true],['Báo cáo lợi nhuận',true],['Lịch sử giao dịch',true],['Tài liệu hỗ trợ thuế',false],['Thông tin tài khoản ngân hàng',false]]
    return `${pageHeader(t('loanTitle'),t('loanSub'),button(t('generateProfile'),'generate-profile',true,'▦'))}
      <section class="loan-hero"><div><span class="eyebrow">SMARTBILL FINANCIAL PROFILE</span><h2>Hồ sơ tài chính minh bạch hơn</h2><p>Dữ liệu được tổng hợp từ doanh thu, chi phí, giao dịch và lịch sử hoạt động.</p></div><div class="score-ring"><strong>82</strong><span>/100</span><small>${t('cashflowScore')}</small></div></section>
      <section class="summary-grid report-summary">${summaryCard(t('avgRevenue'),'58.400.000đ','6 tháng gần nhất')}${summaryCard(t('avgProfit'),'24.100.000đ','Biên lợi nhuận 41%','navy')}${summaryCard(t('revenueStability'),'Ổn định','Biến động thấp','aqua')}${summaryCard(t('operatingPeriod'),'2 năm 4 tháng','Dữ liệu liên tục','orange')}</section>
      <section class="two-col-grid"><article class="panel"><div class="panel-head"><div><h2>${t('profileComplete')}</h2><p>4/6 tài liệu đã sẵn sàng</p></div><strong>78%</strong></div><div class="progress-large"><span style="width:78%"></span></div><div class="check-list">${docs.map(([x,d])=>`<div><span style="color:${d?'#173c91':'#94a3b8'}">${d?'✓':'○'}</span><span>${x}</span></div>`).join('')}</div><div class="loan-document-note"><strong>Còn thiếu để hoàn thiện</strong><p>Bổ sung tài liệu thuế và sao kê tài khoản ngân hàng trong 3–6 tháng gần nhất để hồ sơ có thêm cơ sở đối chiếu.</p></div></article><article class="panel soft-panel"><div class="soft-icon">✓</div><h2>Đánh giá có trách nhiệm</h2><p>${t('loanDisclaimer')}</p><p>Điểm số chỉ giúp chuẩn bị thông tin rõ ràng hơn khi làm việc với đơn vị tài chính. Quyết định cấp tín dụng còn phụ thuộc vào chính sách, hồ sơ pháp lý, lịch sử tín dụng và khả năng trả nợ.</p><ul class="loan-detail-list"><li><strong>Khả năng trả nợ:</strong> đối chiếu dòng tiền ròng với khoản trả dự kiến.</li><li><strong>Tính minh bạch:</strong> doanh thu, chi phí và giao dịch được lưu theo thời gian.</li><li><strong>Hồ sơ bổ sung:</strong> giấy đăng ký kinh doanh, giấy tờ định danh và chứng từ thuế nếu ngân hàng yêu cầu.</li></ul></article></section><section class="loan-media-row">${videoAccent('Chuẩn bị hồ sơ tài chính rõ ràng','Hình ảnh minh họa bối cảnh tính toán, chứng từ và chuẩn bị dữ liệu trước khi làm việc với đơn vị tài chính.','smartbill-finance.mp4','HỒ SƠ VAY VỐN')}</section><section class="panel loan-readiness"><div class="panel-head"><div><h2>Thông tin hỗ trợ trao đổi với ngân hàng</h2><p>Bản tóm tắt giúp chủ hộ chuẩn bị trước khi nộp hồ sơ.</p></div><span class="positive-pill">Sẵn sàng 78%</span></div><div class="report-kpis"><div><span>Mục đích sử dụng vốn</span><strong>Bổ sung vốn lưu động</strong></div><div><span>Khoảng thời gian dữ liệu</span><strong>6 tháng gần nhất</strong></div><div><span>Phương thức đối soát</span><strong>Tiền mặt · QR · Chuyển khoản</strong></div></div><p class="chart-note">Nên kiểm tra lại số liệu và chuẩn bị chứng từ gốc trước khi gửi cho tổ chức tín dụng.</p></section>`
  }

  function devicePage() {
    return `${pageHeader(t('deviceTitle'),t('deviceSub'),button(state.deviceConnected?t('disconnect'):t('connect'),'toggle-device',true,state.deviceConnected?'×':'✓'))}
      <section class="device-hero"><div class="device-render"><span>SMARTBILL</span><strong>MINI</strong><i class="${state.deviceConnected?'on':''}"></i></div><div><span class="status-badge ${state.deviceConnected?'success':'danger'}">${state.deviceConnected?t('connected'):'Offline'}</span><h2>SmartBill Mini 01</h2><p>Mã thiết bị: SBM-2026-0815</p><div class="device-actions"><button class="secondary-button" data-action="sync-device">${t('syncNow')}</button><button class="secondary-button" data-action="test-device">${t('testConnection')}</button></div></div></section>
      <section class="device-stat-grid"><article class="panel stat-tile"><span class="summary-icon">${icon('device')}</span><span>${t('connectionStatus')}</span><strong>${state.deviceConnected?'Ổn định':'Ngoại tuyến'}</strong></article><article class="panel stat-tile"><span class="summary-icon">${icon('sync')}</span><span>${t('lastSync')}</span><strong>2 phút trước</strong></article><article class="panel stat-tile"><span class="summary-icon">${icon('device')}</span><span>${t('powerStatus')}</span><strong>Đang cắm điện</strong></article><article class="panel stat-tile"><span class="summary-icon">${icon('receipt')}</span><span>${t('todayReceived')}</span><strong>128</strong></article></section>
      <section class="device-media-layout">${videoAccent('Thiết bị & giao dịch trong thực tế','Minh họa cách SmartBill kết hợp thiết bị, chứng từ và dữ liệu giao dịch trong quy trình bán hàng.','smartbill-finance.mp4','SMARTBILL MINI')}<section class="panel"><div class="panel-head"><div><h2>Nguồn giao dịch hỗ trợ</h2><p>Dữ liệu có thể được ghi nhận từ nhiều kênh.</p></div></div><div class="source-grid">${['QR thanh toán','Chuyển khoản ngân hàng','Ví điện tử','Tiền mặt'].map(x=>`<div><span class="status-dot online"></span><strong>${x}</strong><small>Đang hoạt động</small></div>`).join('')}</div></section></section>`
  }

  function notificationsPage() {
    return `${pageHeader(t('notificationsTitle'),t('notificationsSub'),button(t('markAllRead'),'mark-all-read',false,'✓'))}<section class="panel notification-list">${state.notifications.map(n=>`<button class="notification-item ${n.read?'read':''}" data-notification="${n.id}"><span class="notification-icon ${n.type}">${icon(n.type==='warning'?'info':n.type==='device'?'device':n.type==='tax'?'tax':'bell')}</span><div><strong>${state.lang==='vi'?n.titleVi:n.titleEn}</strong><p>${state.lang==='vi'?n.textVi:n.textEn}</p><small>${n.time}</small></div>${n.read?'':'<i></i>'}</button>`).join('')}</section>`
  }

  function assistantPage() {
    return `${pageHeader(t('assistantTitle'),t('assistantSub'))}<section class="assistant-layout"><aside class="panel assistant-side"><div class="assistant-orb">${icon('ai')}</div><h2>SmartBill AI</h2><p>Trợ lý tài chính dành cho người không chuyên kế toán.</p><div class="assistant-stats"><span><strong>24/7</strong><small>Hỗ trợ</small></span><span><strong>VI / EN</strong><small>2 ngôn ngữ</small></span></div></aside><article class="panel assistant-chat"><div id="assistantThread" class="chat-thread"></div><div class="suggestion-row">${['Xem doanh thu hôm nay','Cách thêm chi phí','Chuẩn bị dữ liệu thuế','Kết nối SmartBill Mini'].map(x=>`<button data-ai-suggestion="${x}">${x}</button>`).join('')}</div><div class="assistant-input"><input id="assistantInput" placeholder="${t('chatPlaceholder')}"><button id="assistantSend">${icon('arrowRight')}</button></div></article></section>`
  }

  function settingsPage() {
    const p=state.profile
    const rows=[
      [t('personalProfile'),`${escapeHtml(p.name)} · ${escapeHtml(p.phone)}`,'settings','edit-profile'],
      [t('businessInfo'),'Tạp hóa Minh Anh · Cầu Giấy, Hà Nội','receipt','business-info'],
      [t('paymentMethods'),'Tiền mặt, QR, chuyển khoản, ví điện tử','wallet','payment-methods'],
      ['SmartBill Mini','SmartBill Mini 01 · Đang kết nối','device','device'],
      ['Thông báo','Giao dịch, cảnh báo và nhắc việc thuế','bell','notifications'],
      [t('security'),'Mật khẩu và bảo vệ tài khoản','settings','security'],
      [t('backup'),'Tự động mỗi ngày lúc 02:00','sync','backup']
    ]
    return `${pageHeader(t('settingsTitle'),t('settingsSub'))}<section class="settings-grid"><article class="panel settings-list">${rows.map(([title,desc,ic,action])=>`<button data-setting-action="${action}"><span class="setting-icon">${icon(ic)}</span><div><strong>${title}</strong><small>${desc}</small></div><span class="settings-arrow">${icon('arrowRight')}</span></button>`).join('')}<button data-action="toggle-language"><span class="setting-icon">${icon('settings')}</span><div><strong>${t('language')}</strong><small>${state.lang==='vi'?'Tiếng Việt':'English'}</small></div><span>${state.lang.toUpperCase()}</span></button></article><article class="panel profile-card"><img class="big-avatar avatar-image" src="assets/avatar-cat.png" alt="Ảnh đại diện"><h2>${escapeHtml(p.name)}</h2><p>${t('businessOwner')}</p><dl><div><dt>Số điện thoại</dt><dd>${escapeHtml(p.phone)}</dd></div><div><dt>Email</dt><dd>${escapeHtml(p.email)}</dd></div><div><dt>Địa chỉ</dt><dd>${escapeHtml(p.address)}</dd></div></dl><button class="secondary-button" data-action="edit-profile">${t('edit')}</button></article></section><section class="pricing-section"><div class="pricing-intro"><p>Thấp hơn 5–7 lần so với phần mềm kế toán truyền thống.</p></div><div class="pricing-cards exact-pricing"><article class="price-plan"><span class="price-kicker">CƠ BẢN</span><div class="price-line"><strong>99k</strong><small>/tháng</small></div><p>Phù hợp hộ kinh doanh nhỏ mới bắt đầu.</p><ul><li class="yes">Ghi thu/chi không giới hạn</li><li class="yes">Báo cáo ngày/tháng</li><li class="yes">1 thiết bị</li><li class="no">AI phân tích</li><li class="no">Kết nối thuế</li></ul><button class="secondary-button" data-action="start-basic">Bắt đầu dùng thử</button></article><article class="price-plan featured"><div class="popular-badge">PHỔ BIẾN NHẤT</div><span class="price-kicker">CHUYÊN NGHIỆP</span><div class="price-line"><strong>299k</strong><small>/tháng</small></div><p>Đầy đủ tính năng cho hộ kinh doanh phát triển.</p><ul><li class="yes">Tất cả tính năng Cơ bản</li><li class="yes">AI phân tích &amp; dự báo</li><li class="yes">OCR đọc hóa đơn</li><li class="yes">Kết nối cơ quan thuế</li><li class="yes">Hồ sơ vay vốn tự động</li></ul><button class="primary-button" data-action="start-pro">Đăng ký ngay</button></article><article class="price-plan"><span class="price-kicker">DOANH NGHIỆP</span><div class="price-line"><strong>699k</strong><small>/tháng</small></div><p>Cho doanh nghiệp siêu nhỏ, nhiều chi nhánh.</p><ul><li class="yes">Tất cả tính năng Pro</li><li class="yes">Tối đa 5 thiết bị</li><li class="yes">Quản lý nhiều chi nhánh</li><li class="yes">API kết nối ngân hàng</li><li class="yes">Hỗ trợ ưu tiên 24/7</li></ul><button class="secondary-button" data-action="contact-sales">Liên hệ tư vấn</button></article></div></section>`
  }

  function profileForm(){
    const p=state.profile
    openModal(t('personalProfile'), `<form id="profileForm" class="modal-form"><label>Họ và tên<input name="name" value="${escapeHtml(p.name)}" required></label><label>Số điện thoại<input name="phone" value="${escapeHtml(p.phone)}" required></label><label>Email<input name="email" type="email" value="${escapeHtml(p.email)}" required></label><label>Địa chỉ<input name="address" value="${escapeHtml(p.address)}" required></label><div class="modal-actions span-2"><button type="button" class="secondary-button" id="cancelProfile">${t('cancel')}</button><button class="primary-button">${t('save')}</button></div></form>`,()=>{
      const form=$('#profileForm'); $('#cancelProfile').onclick=closeModal
      form.onsubmit=e=>{e.preventDefault();const fd=new FormData(form);state.profile={name:fd.get('name'),phone:fd.get('phone'),email:fd.get('email'),address:fd.get('address')};write('smartbill-profile',state.profile);closeModal();renderPage();updateHeaderProfile();toast(t('success'))}
    })
  }
  function helpPage() {
    const faqs = state.lang==='vi' ? [
      ['SmartBill phù hợp với ai?','SmartBill được thiết kế cho hộ kinh doanh, cửa hàng nhỏ, người bán online và doanh nghiệp siêu nhỏ.'],
      ['SmartBill có ghi nhận tiền mặt không?','Có. Người dùng có thể thêm giao dịch tiền mặt thủ công hoặc ghi nhận qua thiết bị SmartBill Mini.'],
      ['SmartBill có tự nộp thuế không?','Không. SmartBill hỗ trợ sắp xếp dữ liệu, nhắc hạn và tạo báo cáo tham khảo.'],
      ['Dữ liệu có dùng để vay vốn được không?','SmartBill giúp chuẩn bị hồ sơ tài chính rõ ràng hơn nhưng không đảm bảo ngân hàng phê duyệt.']
    ] : [
      ['Who should use SmartBill?','SmartBill is designed for household businesses, small stores, online sellers and micro businesses.'],
      ['Does SmartBill record cash transactions?','Yes. Users can add cash transactions manually or through SmartBill Mini.'],
      ['Does SmartBill submit taxes automatically?','No. It organizes data, provides reminders and generates supporting reports.'],
      ['Can the data support a loan application?','SmartBill prepares clearer financial records but does not guarantee bank approval.']
    ]
    return `${pageHeader(t('helpTitle'),t('helpSub'))}<section class="help-cards"><article class="panel"><span class="summary-icon">${icon('device')}</span><h3>Thiết lập SmartBill Mini</h3><p>Kết nối thiết bị, kiểm tra đồng bộ và xử lý lỗi phổ biến.</p><button class="secondary-button small">Xem hướng dẫn</button></article><article class="panel"><span class="summary-icon">${icon('receipt')}</span><h3>Giao dịch & chi phí</h3><p>Thêm, sửa, lọc dữ liệu và tải ảnh hóa đơn.</p><button class="secondary-button small">Xem hướng dẫn</button></article><article class="panel"><span class="summary-icon">${icon('help')}</span><h3>Dữ liệu thuế</h3><p>Hiểu các chỉ số ước tính và chuẩn bị tài liệu hỗ trợ.</p><button class="secondary-button small">Xem hướng dẫn</button></article></section><section class="help-media-row">${videoAccent('Hướng dẫn trực quan cho chủ hộ kinh doanh','Hình ảnh minh họa giúp phần trợ giúp bớt trống và dễ liên tưởng tới việc kiểm tra số liệu, chứng từ hằng ngày.','smartbill-finance.mp4','SMARTBILL GUIDE')}</section><section class="two-col-grid"><article class="panel"><div class="panel-head"><h2>${t('faq')}</h2></div><div class="faq-list">${faqs.map(([q,a],i)=>`<button data-faq="${i}"><div><strong>${q}</strong><span>⌄</span></div><p hidden>${a}</p></button>`).join('')}</div></article><article class="panel contact-card"><div class="soft-icon">${icon('mail')}</div><h2>${t('contactSupport')}</h2><label>${t('subject')}<input placeholder="Ví dụ: Không đồng bộ được thiết bị"></label><label>${t('message')}<textarea rows="6" placeholder="Mô tả vấn đề bạn đang gặp…"></textarea></label><button class="primary-button" data-action="send-support">${t('sendRequest')}</button></article></section>`
  }

  const pageRenderers = {dashboard:dashboardPage,transactions:transactionsPage,expenses:expensesPage,reports:reportsPage,tax:taxPage,loan:loanPage,device:devicePage,notifications:notificationsPage,assistant:assistantPage,settings:settingsPage,help:helpPage}

  function bindFinanceShowcase() {
    const track = $('.finance-track')
    if (!track) return
    const step = () => Math.min(track.clientWidth * .82, 620)
    $('[data-showcase-next]')?.addEventListener('click', () => track.scrollBy({left:step(),behavior:'smooth'}))
    $('[data-showcase-prev]')?.addEventListener('click', () => track.scrollBy({left:-step(),behavior:'smooth'}))
  }

  function renderPage() {
    const renderer = pageRenderers[state.route] || dashboardPage
    $('#pageHost').innerHTML = renderer() + siteFooter()
    bindPageActions()
    bindFinanceShowcase()
    if (state.route === 'assistant') renderAssistantThread()
  }

  function openModal(title, bodyHtml, onReady) {
    $('#modalTitle').textContent = title; $('#modalBody').innerHTML = bodyHtml; $('#modal').hidden = false
    if (onReady) onReady()
  }
  function closeModal() { $('#modal').hidden = true; $('#modalBody').innerHTML = '' }

  function transactionForm(tx) {
    const editing = !!tx
    openModal(editing ? t('edit') : t('addTransaction'), `<form id="transactionForm" class="modal-form">
      <label>${t('amount')}<input name="amount" type="number" value="${tx?.amount || ''}" required></label>
      <label>${t('method')}<select name="method"><option value="qr">QR</option><option value="cash">${t('cash')}</option><option value="transfer">${t('transfer')}</option><option value="wallet">${t('wallet')}</option></select></label>
      <label class="span-2">${t('product')}<input name="product" value="${escapeHtml(tx?.product || '')}" required></label>
      <label class="span-2">${t('note')}<textarea name="note">${escapeHtml(tx?.note || '')}</textarea></label>
      <label>${t('status')}<select name="status"><option value="recorded">${t('recorded')}</option><option value="pending">${t('pending')}</option></select></label>
      <div class="modal-actions span-2"><button type="button" class="secondary-button" id="cancelModal">${t('cancel')}</button><button class="primary-button">${t('save')}</button></div>
    </form>`, () => {
      const form = $('#transactionForm'); form.method.value = tx?.method || 'qr'; form.status.value = tx?.status || 'recorded'
      $('#cancelModal').onclick = closeModal
      form.onsubmit = e => {
        e.preventDefault(); const fd = new FormData(form)
        const data = {id:tx?.id || `GD-${Date.now().toString().slice(-6)}`,time:tx?.time || new Date().toLocaleString('vi-VN'),product:fd.get('product'),method:fd.get('method'),amount:Number(fd.get('amount')),status:fd.get('status'),note:fd.get('note')}
        state.transactions = editing ? state.transactions.map(x=>x.id===tx.id?data:x) : [data,...state.transactions]
        write('smartbill-transactions',state.transactions);closeModal();renderPage();toast(t('success'))
      }
    })
  }

  function expenseForm(prefill={}) {
    openModal(t('addExpense'), `<form id="expenseForm" class="modal-form">
      <label>${t('amount')}<input name="amount" type="number" value="${prefill.amount || ''}" required></label>
      <label>${t('category')}<select name="category">${['inventory','rent','utilities','salary','transport','marketing','equipment','other'].map(c=>`<option value="${c}">${categoryLabel(c)}</option>`).join('')}</select></label>
      <label>${t('supplier')}<input name="supplier" value="${escapeHtml(prefill.supplier || '')}" required></label>
      <label>${t('dateTime')}<input name="date" type="date" value="${prefill.date || '2026-08-04'}"></label>
      <div class="invoice-drop span-2">⇧<span>${t('uploadInvoice')}</span><small>PNG, JPG hoặc PDF</small></div>
      <div class="modal-actions span-2"><button type="button" class="secondary-button" id="cancelModal">${t('cancel')}</button><button class="primary-button">${t('save')}</button></div>
    </form>`, () => {
      const form=$('#expenseForm'); if(prefill.category) form.category.value=prefill.category; $('#cancelModal').onclick=closeModal
      form.onsubmit=e=>{e.preventDefault();const fd=new FormData(form);state.expenses=[{id:`CP-${Date.now().toString().slice(-5)}`,amount:Number(fd.get('amount')),category:fd.get('category'),supplier:fd.get('supplier'),date:fd.get('date')},...state.expenses];write('smartbill-expenses',state.expenses);closeModal();renderPage();toast(t('success'))}
    })
  }

  function bindPageActions() {
    $$('[data-route]', $('#pageHost')).forEach(b=>b.onclick=()=>navigate(b.dataset.route))
    $$('[data-action]').forEach(btn => btn.onclick = () => handleAction(btn.dataset.action))
    $$('[data-edit-transaction]').forEach(btn => btn.onclick = () => transactionForm(state.transactions.find(x=>x.id===btn.dataset.editTransaction)))
    $$('[data-delete-transaction]').forEach(btn => btn.onclick = () => {state.transactions=state.transactions.filter(x=>x.id!==btn.dataset.deleteTransaction);write('smartbill-transactions',state.transactions);renderPage();toast(t('success'))})
    $$('[data-delete-expense]').forEach(btn => btn.onclick = () => {state.expenses=state.expenses.filter(x=>x.id!==btn.dataset.deleteExpense);write('smartbill-expenses',state.expenses);renderPage();toast(t('success'))})
    $$('[data-notification]').forEach(btn => btn.onclick = () => {state.notifications=state.notifications.map(x=>x.id==btn.dataset.notification?{...x,read:true}:x);write('smartbill-notifications',state.notifications);renderPage()})
    $$('[data-faq]').forEach(btn => btn.onclick = () => {const p=$('p',btn);p.hidden=!p.hidden;btn.classList.toggle('open',!p.hidden)})
    $$('[data-ai-suggestion]').forEach(btn => btn.onclick = () => sendAssistant(btn.dataset.aiSuggestion))
    $$('[data-setting-action]').forEach(btn=>btn.onclick=()=>{
      const a=btn.dataset.settingAction
      if(a==='edit-profile') profileForm()
      else if(a==='notifications') navigate('notifications')
      else if(a==='device') navigate('device')
      else toast(t('success'))
    })
    $$('[data-period-switch] button').forEach(btn=>btn.onclick=()=>{
      $$('[data-period-switch] button').forEach(b=>b.classList.remove('active'));btn.classList.add('active')
      state.dashboardPeriod=btn.dataset.period;write('smartbill-dashboard-period',state.dashboardPeriod)
      const label=$('[data-period-label]');if(label)label.textContent=state.dashboardPeriod==='week'?'7 ngày gần nhất · triệu đồng':state.dashboardPeriod==='month'?'Tháng hiện tại · triệu đồng':'Hôm nay · triệu đồng'
    })
    $$('.report-tabs [data-report-tab]').forEach(btn=>btn.onclick=()=>{$$('.report-tabs [data-report-tab]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const host=$('#reportContent');if(host)host.innerHTML=reportTabContent(btn.dataset.reportTab)})
    if ($('#assistantSend')) $('#assistantSend').onclick=()=>sendAssistant($('#assistantInput').value)
    if ($('#assistantInput')) $('#assistantInput').onkeydown=e=>{if(e.key==='Enter')sendAssistant(e.target.value)}
    if ($('#transactionSearch')) $('#transactionSearch').oninput = filterTransactions
    if ($('#transactionMethod')) $('#transactionMethod').onchange = filterTransactions
    if ($('#expenseSearch')) $('#expenseSearch').oninput = e => {const q=e.target.value.toLowerCase();$('#expenseList').innerHTML=expenseRows(state.expenses.filter(x=>(x.supplier+x.id+categoryLabel(x.category)).toLowerCase().includes(q)));$$('[data-delete-expense]').forEach(btn=>btn.onclick=()=>{state.expenses=state.expenses.filter(x=>x.id!==btn.dataset.deleteExpense);write('smartbill-expenses',state.expenses);renderPage()})}
  }

  function filterTransactions() {
    const q=($('#transactionSearch')?.value||'').toLowerCase(), method=$('#transactionMethod')?.value||'all'
    const list=state.transactions.filter(x=>(x.product+x.id).toLowerCase().includes(q)&&(method==='all'||x.method===method))
    $('#transactionTableBody').innerHTML=transactionRows(list);$('#transactionCardList').innerHTML=transactionCards(list);bindPageActions()
  }

  function handleAction(action) {
    const simple = ['export-pdf','export-excel','generate-tax','download-tax','generate-profile','sync-device','test-device','buy-device','active-plan','contact-sales','send-support']
    if (action==='edit-profile') return profileForm()
    if (simple.includes(action)) return toast(t('success'))
    if (action==='print-report') return window.print()
    if (action==='add-transaction') return transactionForm()
    if (action==='add-expense') return expenseForm()
    if (action==='scan-invoice') {toast(t('detectInvoice'));setTimeout(()=>expenseForm({amount:485000,category:'inventory',supplier:'Nhà phân phối Hoa Việt',date:'2026-08-04'}),700);return}
    if (action==='toggle-device') {state.deviceConnected=!state.deviceConnected;write('smartbill-device-connected',state.deviceConnected);renderPage();toast(t('success'));return}
    if (action==='mark-all-read') {state.notifications=state.notifications.map(x=>({...x,read:true}));write('smartbill-notifications',state.notifications);renderPage();return}
    if (action==='toggle-language') return setLanguage()
  }

  function renderAssistantThread() {
    if (!state.chat[0].text) state.chat[0].text=t('assistantWelcome')
    const thread=$('#assistantThread'); if(!thread)return
    thread.innerHTML=state.chat.map(m=>`<div class="thread-msg ${m.from}">${m.from==='bot'?`<span>${icon('ai')}</span>`:''}<p>${escapeHtml(m.text)}</p></div>`).join('');thread.scrollTop=thread.scrollHeight
  }
  function assistantReply(q) {
    const lower=q.toLowerCase()
    if(lower.includes('doanh thu')||lower.includes('revenue')) return state.lang==='vi'?'Doanh thu hôm nay đang là 12.840.000đ, tăng 14,2% so với kỳ trước.':'Today’s revenue is 12,840,000 VND, up 14.2% from the previous period.'
    if(lower.includes('chi phí')||lower.includes('expense')) return state.lang==='vi'?'Bạn có thể vào mục Chi phí → Thêm chi phí hoặc tải ảnh hóa đơn để AI gợi ý dữ liệu.':'Open Expenses → Add Expense, or upload an invoice for AI-assisted data suggestions.'
    if(lower.includes('thuế')||lower.includes('tax')) return state.lang==='vi'?'SmartBill giúp tổng hợp dữ liệu và tạo ước tính sơ bộ, không tự động nộp tờ khai chính thức.':'SmartBill organizes data and provides preliminary estimates; it does not officially submit tax declarations.'
    return state.lang==='vi'?'Tôi đã ghi nhận câu hỏi. Bạn có thể xem thêm trong mục Báo cáo hoặc Hỗ trợ thuế.':'I recorded your question. You can review more details in Reports or Tax Support.'
  }
  function sendAssistant(text) {if(!text?.trim())return;state.chat.push({from:'user',text:text.trim()},{from:'bot',text:assistantReply(text)});renderAssistantThread();const input=$('#assistantInput');if(input)input.value=''}

  function renderChat() {
    const host=$('#chatMessages'); if(!host)return
    if(!state.chat[0].text) state.chat[0].text=t('assistantWelcome')
    host.innerHTML=state.chat.map(m=>`<div class="chat-msg ${m.from}">${escapeHtml(m.text)}</div>`).join('');host.scrollTop=host.scrollHeight
  }
  function sendPopupChat(){const input=$('#chatInput'),q=input.value.trim();if(!q)return;state.chat.push({from:'user',text:q},{from:'bot',text:assistantReply(q)});input.value='';renderChat()}

  function renderOnboarding() {
    const labels=state.lang==='vi'?['Thông tin kinh doanh','Phương thức thanh toán','Kết nối thiết bị','Hoàn tất']:['Business information','Payment methods','Connect device','Finish']
    $('#stepper').innerHTML=labels.map((x,i)=>`<div class="step ${i<=state.onboardingStep?'active':''}"><span>${i<state.onboardingStep?'✓':i+1}</span><small>${x}</small></div>`).join('')
    const body=$('#onboardingBody')
    if(state.onboardingStep===0) body.innerHTML=`<h2>${labels[0]}</h2><div class="form-grid"><label>Tên hộ kinh doanh<input value="Tạp hóa Minh Anh"></label><label>Tên chủ hộ<input value="Nguyễn Minh Anh"></label><label>Số điện thoại<input value="0912 345 678"></label><label>Ngành nghề<select><option>Tạp hóa / bán lẻ</option><option>Ăn uống</option><option>Dịch vụ</option></select></label><label class="span-2">Địa chỉ<input value="Cầu Giấy, Hà Nội"></label></div>`
    if(state.onboardingStep===1) body.innerHTML=`<h2>${labels[1]}</h2><p>Chọn những phương thức bạn đang sử dụng.</p><div class="choice-grid">${['Tiền mặt','QR','Chuyển khoản','Ví điện tử'].map(x=>`<label class="choice-card"><input type="checkbox" checked><span>${x}</span></label>`).join('')}</div>`
    if(state.onboardingStep===2) body.innerHTML=`<h2>${labels[2]}</h2><div class="device-setup"><div class="device-illustration">SB MINI</div><div><label>Mã thiết bị<input value="SBM-2026-0815"></label><div class="status-line"><span class="status-dot online"></span>Sẵn sàng kết nối</div><button class="secondary-button" id="testOnboardingDevice">${t('testConnection')}</button></div></div>`
    if(state.onboardingStep===3) body.innerHTML=`<div class="done-state"><div class="done-icon">${icon('check')}</div><h2>SmartBill đã sẵn sàng!</h2><p>Bạn có thể bắt đầu ghi nhận giao dịch và theo dõi tài chính ngay bây giờ.</p><button id="finishOnboarding" class="primary-button">${t('dashboard')}</button></div>`
    $('#onboardingBack').disabled=state.onboardingStep===0
    $('#onboardingNext').hidden=state.onboardingStep===3
    if($('#testOnboardingDevice'))$('#testOnboardingDevice').onclick=()=>toast(t('success'))
    if($('#finishOnboarding'))$('#finishOnboarding').onclick=()=>{state.auth=true;write('smartbill-auth',true);showView('app');navigate('dashboard')}
  }

  function updateHeaderProfile(){
    const el=$('#headerProfileName'); if(el) el.textContent=(state.profile?.name || 'Minh Anh').split(' ').slice(-2).join(' ')
  }
  function bindGlobalSearch(){
    const input=$('.header-search input'); if(!input)return
    const routes=[['dashboard','Tổng quan'],['transactions','Giao dịch'],['expenses','Chi phí'],['reports','Báo cáo'],['tax','Hỗ trợ thuế'],['loan','Hồ sơ vay vốn'],['device','SmartBill Mini'],['notifications','Thông báo'],['assistant','Trợ lý AI'],['settings','Cài đặt'],['help','Trợ giúp']]
    input.onkeydown=e=>{
      if(e.key!=='Enter')return
      const q=input.value.trim().toLowerCase(); if(!q)return
      const exact=routes.find(([r,label])=>label.toLowerCase().includes(q)||r.includes(q))
      if(exact){navigate(exact[0]);return}
      const tx=state.transactions.find(x=>(x.product+' '+x.id).toLowerCase().includes(q))
      const ex=state.expenses.find(x=>(x.supplier+' '+x.id+' '+categoryLabel(x.category)).toLowerCase().includes(q))
      if(tx||ex){navigate(tx?'transactions':'expenses');setTimeout(()=>{const el=tx?$('#transactionSearch'):$('#expenseSearch');if(el){el.value=input.value;el.dispatchEvent(new Event('input'))}},0);return}
      toast(state.lang==='vi'?'Không tìm thấy nội dung phù hợp.':'No matching result found.')
    }
  }
  function initEvents() {
    $$('[data-lang-toggle]').forEach(b=>b.onclick=setLanguage)

    const openAuth = (mode='login') => {
      const modal = $('#authModal')
      if (!modal) return
      modal.hidden = false
      $('#loginForm').hidden = mode !== 'login'
      $('#registerForm').hidden = mode !== 'register'
      if (mode === 'register') $('#registerName')?.focus()
      else $('#loginEmail')?.focus()
    }
    const closeAuth = () => {
      if ($('#authModal')) $('#authModal').hidden = true
    }

    const doLogin = () => {
      const email = ($('#loginEmail')?.value || '').trim().toLowerCase()
      const password = $('#loginPassword')?.value || ''
      const users = read('smartbill-users', [])
      const validDemo = email === 'demo@smartbill.vn' && password === '123456'
      const validUser = Array.isArray(users) && users.some(u => u.email === email && u.password === password)
      if (!email || !password) { toast('Vui lòng nhập email và mật khẩu.'); return }
      if (!validDemo && !validUser) { toast('Email hoặc mật khẩu không đúng.'); return }
      if (validUser) {
        const user = users.find(u => u.email === email)
        if (user?.name) { state.profile={...state.profile,name:user.name,email:user.email}; write('smartbill-profile',state.profile) }
      }
      state.auth = true
      closeAuth()
      showView('app')
      state.route = 'dashboard'
      history.replaceState(null, '', location.pathname + '#/dashboard')
      renderNav()
      renderPage()
      window.scrollTo(0,0)
      write('smartbill-auth', true)
      toast('Đăng nhập thành công!')
    }

    const doRegister = () => {
      const name = ($('#registerName')?.value || '').trim()
      const email = ($('#registerEmail')?.value || '').trim().toLowerCase()
      const password = $('#registerPassword')?.value || ''
      const confirm = $('#registerConfirm')?.value || ''
      if (!name) { toast('Vui lòng nhập họ và tên.'); return }
      if (!email) { toast('Vui lòng nhập email.'); return }
      if (password.length < 6) { toast('Mật khẩu phải có ít nhất 6 ký tự.'); return }
      if (password !== confirm) { toast('Mật khẩu nhập lại không khớp.'); return }
      if (email === 'demo@smartbill.vn') { toast('Email này đang được dùng cho tài khoản demo.'); return }
      const users = read('smartbill-users', [])
      if (Array.isArray(users) && users.some(u => u.email === email)) { toast('Email này đã được đăng ký.'); return }
      const newUsers = Array.isArray(users) ? users : []
      newUsers.push({name,email,password})
      write('smartbill-users', newUsers)
      state.profile={...state.profile,name,email}
      write('smartbill-profile',state.profile)
      state.auth=true
      closeAuth()
      showView('app')
      state.route='dashboard'
      history.replaceState(null, '', location.pathname + '#/dashboard')
      renderNav()
      renderPage()
      window.scrollTo(0,0)
      write('smartbill-auth',true)
      toast('Đăng ký thành công!')
    }

    $('#loginForm').onsubmit=e=>{e.preventDefault();doLogin()}
    $('#registerForm').onsubmit=e=>{e.preventDefault();doRegister()}
    $('#loginForm .auth-primary-button')?.addEventListener('click',e=>{e.preventDefault();doLogin()})
    $('#registerForm .auth-primary-button')?.addEventListener('click',e=>{e.preventDefault();doRegister()})

    if ($('#authLoginButton')) $('#authLoginButton').onclick=()=>openAuth('login')
    if ($('#authRegisterButton')) $('#authRegisterButton').onclick=()=>openAuth('register')
    if ($('#authRegisterFromLogin')) $('#authRegisterFromLogin').onclick=()=>openAuth('register')
    if ($('#authLoginFromRegister')) $('#authLoginFromRegister').onclick=()=>openAuth('login')
    if ($('#authCloseButton')) $('#authCloseButton').onclick=closeAuth
    $('#authModal')?.addEventListener('click',e=>{if(e.target===$('#authModal'))closeAuth()})

    if ($('#openOnboarding')) $('#openOnboarding').onclick=()=>{state.onboardingStep=0;showView('onboarding');renderOnboarding()}
    if ($('#landingTrial')) $('#landingTrial').onclick=()=>{state.onboardingStep=0;showView('onboarding');renderOnboarding()}
    if ($('#landingLoginFocus')) $('#landingLoginFocus').onclick=()=>openAuth('login')
    if ($('#landingDemoScroll')) $('#landingDemoScroll').onclick=()=>$('#landing-features')?.scrollIntoView({behavior:'smooth',block:'center'})
    if ($('#landingMobileMenu')) $('#landingMobileMenu').onclick=()=>$('#landingLinks')?.classList.toggle('open')
    $('#onboardingBack').onclick=()=>{if(state.onboardingStep===0){showView('login')}else{state.onboardingStep--;renderOnboarding()}}
    $('#onboardingNext').onclick=()=>{state.onboardingStep=Math.min(3,state.onboardingStep+1);renderOnboarding()}
    const doLogout=()=>{state.auth=false;write('smartbill-auth',false);history.replaceState(null,'',location.pathname);showView('login')}
    if ($('#logoutButton')) $('#logoutButton').onclick=doLogout
    if ($('#logoutButtonTop')) $('#logoutButtonTop').onclick=doLogout
    if ($('#collapseSidebar')) $('#collapseSidebar').onclick=()=>{}
    if ($('#mobileMenuButton')) $('#mobileMenuButton').onclick=()=>{}
    if ($('#closeSidebar')) $('#closeSidebar').onclick=()=>{}
    if ($('#notificationShortcut')) { $('#notificationShortcut').innerHTML = icon('bell'); $('#notificationShortcut').onclick=()=>navigate('notifications') }
    if ($('#settingsShortcut')) { $('#settingsShortcut').innerHTML = '<img src="./assets/settings-gear-blue.png" alt="">'; $('#settingsShortcut').onclick=()=>navigate('settings') }
    if ($('.header-search>span')) $('.header-search>span').innerHTML = icon('search')
    bindGlobalSearch()
    updateHeaderProfile()
    if ($('#chatFab')) $('#chatFab').innerHTML = icon('ai')
    $('#modalClose').onclick=closeModal
    $('#modal').onclick=e=>{if(e.target===$('#modal'))closeModal()}
    $('#chatFab').onclick=()=>{$('#chatPopup').hidden=!$('#chatPopup').hidden;renderChat()}
    $('#closeChat').onclick=()=>$('#chatPopup').hidden=true
    $('#chatSend').onclick=sendPopupChat
    $('#chatInput').onkeydown=e=>{if(e.key==='Enter')sendPopupChat()}
    window.addEventListener('hashchange',()=>{
      const r=location.hash.replace('#/','')
      if(!state.auth){
        history.replaceState(null,'',location.pathname)
        showView('login')
        return
      }
      if(r){state.route=r;renderNav();renderPage();window.scrollTo(0,0)}
    })
  }

  function init() {
    applyI18n(); initEvents(); state.chat[0].text=t('assistantWelcome')
    if(state.auth){showView('app');renderNav();renderPage()}else showView('login')
  }
  init()
})()
