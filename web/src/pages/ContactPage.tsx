export default function ContactPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">📞 聯絡客服</h1>
      <div className="border border-slate-200 rounded p-6 mb-4 text-center">
        <div className="text-3xl mb-2">⏰</div>
        <div className="text-lg font-medium mb-1">服務時間</div>
        <div className="text-sm text-slate-600 mb-3">週一至五 9:00-18:00(假日休)</div>
        <a href="tel:0800-123-456" className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg font-medium" data-testid="hotline">
          📞 客服專線 0800-123-456
        </a>
      </div>
      <div className="border border-slate-200 rounded p-4 text-sm">
        <h3 className="font-medium mb-2">緊急出險流程</h3>
        <ol className="space-y-1 list-decimal pl-5 text-slate-600 text-xs">
          <li>撥打客服專線通報出險</li>
          <li>確認保單狀態與理賠文件</li>
          <li>至鄰近醫院或鑑識中心取得單據</li>
          <li>線上送審理賠</li>
          <li>透過 App 追蹤理賠進度</li>
        </ol>
      </div>
    </div>
  )
}
