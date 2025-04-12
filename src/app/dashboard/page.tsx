"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function SubscriptionDashboard() {
  return (
    <div className="bg-gray-50 font-['Inter']">
      {/* 상단 네비게이션 */}
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg !rounded-button hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <i className="fas fa-bars w-6 h-6"></i>
              </button>
              <Link href="#" className="flex ml-2 md:mr-24">
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap">
                  Dashboard
                </span>
              </Link>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ml-3">
                <div className="relative">
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                    id="user-menu-button"
                  ></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* 사이드바 */}
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
          <ul className="space-y-2 font-medium">
            {[
              ["Dashboard", "fa-gauge-high", "text-custom bg-gray-100"],
              ["Subscriptions", "fa-credit-card"],
              ["Billing", "fa-file-invoice-dollar"],
              ["Settings", "fa-gear"],
              ["Support", "fa-headset"],
            ].map(([label, icon, extra], i) => (
              <li key={i}>
                <Link
                  href="#"
                  className={`flex items-center p-2 text-gray-900 rounded-lg !rounded-button hover:bg-gray-100 ${
                    extra || ""
                  }`}
                >
                  <i className={`fas ${icon} w-6 h-6`}></i>
                  <span className="flex-1 ml-3 whitespace-nowrap">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* 본문 */}
      <main className="p-4 sm:ml-64 pt-20">
        {/* 카드 3종 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {/* Current Plan */}
          <div className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Current Plan</h3>
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                Active
              </span>
            </div>
            <div className="mb-4">
              <h4 className="text-2xl font-bold text-custom">Pro Plan</h4>
              <p className="text-gray-500">$49.99/month</p>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Next billing: Jul 1, 2024
              </span>
              <button className="text-custom hover:bg-custom/10 font-medium rounded-lg !rounded-button text-sm px-4 py-2">
                Manage
              </button>
            </div>
          </div>

          {/* Usage Statistics */}
          <div className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Usage Statistics</h3>
              <i className="fas fa-chart-line text-gray-400"></i>
            </div>
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">
                  Storage
                </span>
                <span className="text-sm text-gray-600">75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-custom h-2.5 rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">
                  Bandwidth
                </span>
                <span className="text-sm text-gray-600">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-custom h-2.5 rounded-full"
                  style={{ width: "45%" }}
                ></div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Recent Activity</h3>
              <i className="fas fa-clock text-gray-400"></i>
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                <i className="fas fa-arrow-up text-green-500 mr-2"></i>
                <div>
                  <p className="text-sm font-medium">Plan upgraded</p>
                  <p className="text-xs text-gray-500">2 days ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <i className="fas fa-credit-card text-blue-500 mr-2"></i>
                <div>
                  <p className="text-sm font-medium">Payment processed</p>
                  <p className="text-xs text-gray-500">5 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Billing History */}
        <div className="mb-4">
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold mb-4">Billing History</h3>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Invoice</th>
                    <th className="px-6 py-3">Amount</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Jun 1, 2024", "#INV-001", "$49.99"],
                    ["May 1, 2024", "#INV-002", "$49.99"],
                  ].map(([date, invoice, amount], i) => (
                    <tr key={i} className="bg-white border-b">
                      <td className="px-6 py-4">{date}</td>
                      <td className="px-6 py-4">{invoice}</td>
                      <td className="px-6 py-4">{amount}</td>
                      <td className="px-6 py-4">
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          Paid
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-custom hover:text-custom/80">
                          <i className="fas fa-download"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Available Plans */}
        <div>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold mb-4">Available Plans</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: "Basic",
                  price: "$29.99",
                  features: ["10GB Storage", "2 Team members", "Basic support"],
                  bg: "bg-gray-50",
                  buttonText: "Choose Plans",
                },
                {
                  title: "Pro",
                  price: "$49.99",
                  features: [
                    "50GB Storage",
                    "5 Team members",
                    "Priority support",
                  ],
                  bg: "bg-custom text-white",
                  tag: "Popular",
                  buttonText: "Current Plan",
                  isCurrent: true,
                },
                {
                  title: "Enterprise",
                  price: "$99.99",
                  features: [
                    "Unlimited Storage",
                    "Unlimited Team members",
                    "24/7 Premium support",
                  ],
                  bg: "bg-gray-50",
                  buttonText: "Choose Plan",
                },
              ].map((plan, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-lg border ${
                    plan.isCurrent ? "border-custom" : "border-gray-200"
                  } relative ${plan.bg}`}
                >
                  {plan.tag && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded absolute -top-2 left-1/2 -translate-x-1/2">
                      {plan.tag}
                    </span>
                  )}
                  <h3
                    className={`text-xl font-semibold mb-2 ${
                      plan.isCurrent ? "text-white" : ""
                    }`}
                  >
                    {plan.title}
                  </h3>
                  <p
                    className={`text-3xl font-bold mb-4 ${
                      plan.isCurrent ? "text-white" : ""
                    }`}
                  >
                    {plan.price}
                    <span
                      className={`text-sm font-normal ml-1 ${
                        plan.isCurrent ? "text-gray-100" : "text-gray-500"
                      }`}
                    >
                      /month
                    </span>
                  </p>
                  <ul
                    className={`space-y-3 mb-6 ${
                      plan.isCurrent ? "text-gray-100" : ""
                    }`}
                  >
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center">
                        <i
                          className={`fas fa-check ${
                            plan.isCurrent ? "text-white" : "text-green-500"
                          } mr-2`}
                        ></i>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full ${
                      plan.isCurrent
                        ? "bg-white text-custom"
                        : "bg-gray-200 text-gray-800"
                    } hover:bg-gray-300 font-medium rounded-lg !rounded-button text-sm px-5 py-2.5`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
