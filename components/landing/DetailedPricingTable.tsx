import React from 'react';
import { Check, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function DetailedPricingTable() {
  const t = useTranslations('landing.detailedPricing');
  const features = [
    {
      category: t('db.category'),
      items: [
        { name: t('db.f1Name'), subtitle: t('db.f1Sub'), free: true, basic: true, growth: true, premium: true },
        { name: t('db.f2Name'), subtitle: t('db.f2Sub'), free: false, basic: true, growth: true, premium: true },
        { name: t('db.f3Name'), subtitle: t('db.f3Sub'), free: false, basic: true, growth: true, premium: true },
        { name: t('db.f4Name'), subtitle: t('db.f4Sub'), free: "0", basic: "100", growth: "500", premium: "1000" },
        { name: t('db.f5Name'), subtitle: t('db.f5Sub'), free: false, basic: true, growth: true, premium: true },
        { name: t('db.f6Name'), subtitle: t('db.f6Sub'), free: false, basic: false, growth: true, premium: true },
        { name: t('db.f7Name'), subtitle: t('db.f7Sub'), free: false, basic: false, growth: true, premium: true },
        { name: t('db.f8Name'), subtitle: t('db.f8Sub'), free: false, basic: false, growth: t('db.f8V1'), premium: t('db.f8V2') },
        { name: t('db.f9Name'), subtitle: t('db.f9Sub'), free: false, basic: false, growth: false, premium: true },
      ]
    },
    {
      category: t('email.category'),
      items: [
        { name: t('email.f1Name'), subtitle: t('email.f1Sub'), free: false, basic: true, growth: true, premium: true },
        { name: t('email.f2Name'), subtitle: t('email.f2Sub'), free: false, basic: true, growth: true, premium: true },
        { name: t('email.f3Name'), subtitle: t('email.f3Sub'), free: false, basic: t('unlimited'), growth: t('unlimited'), premium: t('unlimited') },
        { name: t('email.f4Name'), subtitle: t('email.f4Sub'), free: false, basic: true, growth: true, premium: true },
      ]
    },
    {
      category: t('crm.category'),
      items: [
        { name: t('crm.f1Name'), subtitle: t('crm.f1Sub'), free: "5", basic: "100", growth: "500", premium: "1000" },
        { name: t('crm.f2Name'), subtitle: t('crm.f2Sub'), free: t('unlimited'), basic: t('unlimited'), growth: t('unlimited'), premium: t('unlimited') },
      ]
    }
  ];

  const renderCell = (value: string | boolean) => {
    if (value === true) return <Check size={18} className="mx-auto text-emerald-500" />;
    if (value === false) return <X size={18} className="mx-auto text-rose-300" />;
    return <span>{value}</span>;
  };

  return (
    <section className="bg-white text-black py-20 px-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr>
                <th className="w-[30%] p-4 rounded-tl-2xl bg-gray-50 border-r border-white font-semibold">{t('title')}</th>
                <th className="w-[17%] p-4 text-center bg-gray-50/50 border-r border-white font-bold text-gray-400">{t('free')}</th>
                <th className="w-[17%] p-4 text-center bg-gray-50 border-r border-white font-bold text-gray-700">{t('starter')}</th>
                <th className="w-[17%] p-4 text-center bg-blue-50 border-r border-white font-bold text-blue-700">{t('growth')}</th>
                <th className="w-[17%] p-4 rounded-tr-2xl text-center bg-gray-50 font-bold text-gray-700">{t('premium')}</th>
              </tr>
            </thead>
            <tbody>
              {features.map((category, idx) => (
                <React.Fragment key={idx}>
                  {/* Category Header */}
                  <tr>
                    <td colSpan={5} className="bg-gray-100/50 p-4 font-bold text-gray-800 uppercase tracking-wider text-xs">
                      {category.category}
                    </td>
                  </tr>
                  {/* Items */}
                  {category.items.map((item, i) => (
                    <tr key={i} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="font-semibold text-gray-800">{item.name}</div>
                        <div className="text-xs text-gray-500 mt-1">{item.subtitle}</div>
                      </td>
                      <td className="p-4 text-center align-middle font-medium text-gray-400">
                        {renderCell(item.free)}
                      </td>
                      <td className="p-4 text-center align-middle font-medium text-gray-600">
                        {renderCell(item.basic)}
                      </td>
                      <td className="p-4 text-center align-middle font-medium text-blue-700 bg-blue-50/30">
                        {renderCell(item.growth)}
                      </td>
                      <td className="p-4 text-center align-middle font-medium text-gray-600">
                        {renderCell(item.premium)}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
