<script setup>
import { Head, router } from '@inertiajs/vue3';
import { computed, reactive, watch } from 'vue';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'vue-chartjs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const props = defineProps({
  stats: Object,
  teamPerformance: Array,
  vendorFunnel: Object,
  verticals: Array,
  filters: Object,
  user: Object,
});

const filterState = reactive({
    startDate: props.filters.startDate,
    endDate: props.filters.endDate,
    verticalId: props.filters.verticalId || '',
});

const applyFilters = () => {
    router.get(route('dashboard'), filterState, {
        preserveState: true,
        preserveScroll: true,
        replace: true,
    });
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
};

// Team Performance Chart Data
const teamChartData = computed(() => ({
  labels: props.teamPerformance.map(m => m.name),
  datasets: [
    {
      label: 'Revenue (₹)',
      backgroundColor: '#6366f1',
      data: props.teamPerformance.map(m => m.revenue)
    }
  ]
}));

// Vendor Funnel Chart Data
const vendorChartData = computed(() => ({
  labels: Object.keys(props.vendorFunnel),
  datasets: [
    {
      backgroundColor: ['#94a3b8', '#38bdf8', '#22c55e', '#ef4444'],
      data: Object.values(props.vendorFunnel)
    }
  ]
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom' },
  }
};

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
  scales: {
    y: { beginAtZero: true }
  }
};

// Conversion Rate Color
const conversionColor = computed(() => {
  if (props.stats.conversionRate >= 20) return 'text-green-600';
  if (props.stats.conversionRate >= 10) return 'text-amber-600';
  return 'text-red-600';
});
const exportLeads = () => {
    const params = new URLSearchParams(filterState);
    window.location.href = route('dashboard.export-leads') + '?' + params.toString();
};
</script>

<template>
    <Head title="Ops Dashboard" />

    <div class="min-h-screen bg-slate-50 dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800">
        <!-- Header -->
        <header class="bg-white dark:bg-slate-800 shadow-sm sticky top-0 z-10 border-b border-slate-200 dark:border-slate-700">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                   <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Ops Dashboard</h1>
                   <p class="text-sm text-slate-500">Welcome back, {{ user.name }} ({{ user.role }})</p>
                </div>
                
                <!-- Filters Bar -->
                <div class="flex flex-wrap items-center gap-3 bg-slate-50 dark:bg-slate-700/50 p-2 rounded-xl border border-slate-200 dark:border-slate-600">
                    <div class="flex items-center gap-2">
                        <label class="text-xs font-bold text-slate-500 uppercase">From</label>
                        <input type="date" v-model="filterState.startDate" @change="applyFilters" class="text-sm bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-indigo-500 transition">
                    </div>
                    <div class="flex items-center gap-2">
                        <label class="text-xs font-bold text-slate-500 uppercase">To</label>
                        <input type="date" v-model="filterState.endDate" @change="applyFilters" class="text-sm bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-indigo-500 transition">
                    </div>
                    <div class="flex items-center gap-2">
                        <label class="text-xs font-bold text-slate-500 uppercase">Vertical</label>
                        <select v-model="filterState.verticalId" @change="applyFilters" class="text-sm bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-indigo-500 transition min-w-[120px]">
                            <option value="">All Verticals</option>
                            <option v-for="v in verticals" :key="v.id" :value="v.id">{{ v.name }}</option>
                        </select>
                    </div>
                    <div class="h-6 w-px bg-slate-300 dark:bg-slate-600 mx-1"></div>
                    <button @click="exportLeads" class="px-3 py-1 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
                        Export
                    </button>
                </div>
            </div>
        </header>

        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Stats Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <!-- Card 1: Total Leads -->
                <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                    </div>
                    <p class="text-sm font-medium text-slate-500 dark:text-slate-400">Filtered Leads</p>
                    <h3 class="text-2xl font-bold text-slate-900 dark:text-white mt-1">{{ stats.totalLeads }}</h3>
                </div>

                <!-- Card 2: Total Revenue Pipeline -->
                <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    <p class="text-sm font-medium text-slate-500 dark:text-slate-400">Potential Revenue</p>
                    <h3 class="text-2xl font-bold text-slate-900 dark:text-white mt-1">{{ formatCurrency(stats.totalRevenue) }}</h3>
                </div>

                <!-- Card 3: Won Revenue -->
                <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    <p class="text-sm font-medium text-slate-500 dark:text-slate-400">Closed Revenue</p>
                    <h3 class="text-2xl font-bold text-slate-900 dark:text-white mt-1">{{ formatCurrency(stats.wonRevenue) }}</h3>
                </div>

                <!-- Card 4: Conversion Rate -->
                <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-12 h-12 bg-amber-50 dark:bg-amber-900/30 rounded-xl flex items-center justify-center text-amber-600 dark:text-amber-400">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                    </div>
                    <p class="text-sm font-medium text-slate-500 dark:text-slate-400">Conversion (Won)</p>
                    <h3 class="text-2xl font-bold mt-1" :class="conversionColor">{{ stats.conversionRate }}%</h3>
                </div>
            </div>

            <!-- Analytics Vision -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <!-- Team Revenue Chart -->
                <div class="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-6">Performance by Agent</h3>
                    <div class="h-80">
                         <Bar v-if="teamPerformance.length > 0" :data="teamChartData" :options="barOptions" />
                         <div v-else class="h-full flex items-center justify-center text-slate-400">No performance data for this selection.</div>
                    </div>
                </div>

                <!-- Vendor Funnel -->
                <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-6">Vendor Funnel</h3>
                    <div class="h-64 mb-6">
                        <Doughnut :data="vendorChartData" :options="chartOptions" />
                    </div>
                    <div class="space-y-3">
                        <div v-for="(count, stage) in vendorFunnel" :key="stage" class="flex justify-between items-center text-sm">
                            <span class="text-slate-600 dark:text-slate-400">{{ stage }}</span>
                            <span class="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-slate-900 dark:text-white font-bold">{{ count }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Team Performance Table (Responsive) -->
            <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div class="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                    <h3 class="text-lg font-bold text-slate-900 dark:text-white">Detailed Team Metrics</h3>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left">
                        <thead class="bg-slate-50 dark:bg-slate-700/50">
                            <tr>
                                <th class="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Agent Name</th>
                                <th class="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Total Leads</th>
                                <th class="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Conversion</th>
                                <th class="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Revenue Target</th>
                                <th class="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Closed Revenue</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
                            <tr v-for="member in teamPerformance" :key="member.name" class="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition">
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">{{ member.name }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">{{ member.leads }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm">
                                    <span class="px-2 py-1 rounded-full text-xs font-bold" :class="member.conversion > 15 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'">
                                        {{ member.conversion }}%
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">₹ —</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900 dark:text-white">{{ formatCurrency(member.revenue) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    </div>
</template>
