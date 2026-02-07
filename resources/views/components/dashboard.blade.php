<x-layout>
   <div class="mb-6 sm:mb-8">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
      <p class="text-sm sm:text-base text-gray-600">Overview of your copra quality testing data</p>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
      <div class="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6">
        <div class="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between mb-2">
          <span class="text-xs sm:text-sm font-medium text-gray-600 mb-2 sm:mb-0">Total Tests</span>
          <div class="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 sm:w-5 sm:h-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </div>
        </div>
        <p id="total-tests" class="text-2xl sm:text-3xl font-bold text-gray-900">0</p>
      </div>

      <div class="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6">
        <div class="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between mb-2">
          <span class="text-xs sm:text-sm font-medium text-gray-600 mb-2 sm:mb-0">Avg Moisture</span>
          <div class="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 sm:w-5 sm:h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
            </svg>
          </div>
        </div>
        <p id="avg-moisture" class="text-2xl sm:text-3xl font-bold text-gray-900">0%</p>
      </div>

      <div class="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6">
        <div class="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between mb-2">
          <span class="text-xs sm:text-sm font-medium text-gray-600 mb-2 sm:mb-0">Avg Oil Content</span>
          <div class="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 sm:w-5 sm:h-5 text-orange-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
            </svg>
          </div>
        </div>
        <p id="avg-oil" class="text-2xl sm:text-3xl font-bold text-gray-900">0%</p>
      </div>

      <div class="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6">
        <div class="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between mb-2">
          <span class="text-xs sm:text-sm font-medium text-gray-600 mb-2 sm:mb-0">Last Test</span>
          <div class="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
        <p id="last-test" class="text-base sm:text-lg font-semibold text-gray-900">-</p>
      </div>
    </div>

    <div class="grid lg:grid-cols-3 gap-6 sm:gap-6 mb-6 sm:mb-8">
      <div class="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6 lg:col-span-2">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3">
          <h2 class="text-lg sm:text-xl font-bold text-gray-900">Recent Tests</h2>
          <a href="{{ route('test') }}" class="w-full sm:w-auto text-center px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 font-medium text-sm">New Test</a>
        </div>

        <div id="tests-container" class="space-y-4">
          <div class="text-center py-12 text-gray-500">
            <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <p>No tests recorded yet</p>
            <a href="{{ route('test') }}" class="text-green-700 hover:text-green-800 font-medium mt-2 inline-block">Create your first test</a>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6">
        <h2 class="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Quality Distribution</h2>
        <div id="quality-distribution" class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-600">Grade A</span>
            <span id="grade-a-count" class="text-sm font-bold text-green-700">0</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div id="grade-a-bar" class="bg-green-700 h-2 rounded-full" style="width: 0%"></div>
          </div>

          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-600">Grade B</span>
            <span id="grade-b-count" class="text-sm font-bold text-blue-700">0</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div id="grade-b-bar" class="bg-blue-700 h-2 rounded-full" style="width: 0%"></div>
          </div>

          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-600">Grade C</span>
            <span id="grade-c-count" class="text-sm font-bold text-orange-700">0</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div id="grade-c-bar" class="bg-orange-700 h-2 rounded-full" style="width: 0%"></div>
          </div>

          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-600">Other</span>
            <span id="grade-other-count" class="text-sm font-bold text-gray-700">0</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div id="grade-other-bar" class="bg-gray-700 h-2 rounded-full" style="width: 0%"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4">
        <h2 class="text-lg sm:text-xl font-bold text-gray-900">Historical Data</h2>

        <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <select id="filter-period" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm">
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month" selected>This Month</option>
            <option value="year">This Year</option>
          </select>

          <div class="flex gap-2">
            <input type="date" id="start-date" class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm" placeholder="Start Date">
            <input type="date" id="end-date" class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm" placeholder="End Date">
          </div>
        </div>
      </div>

      <div class="overflow-x-auto -mx-4 sm:mx-0">
        <table class="w-full min-w-[800px]">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Moisture %</th>
              <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Oil %</th>
              <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight (kg)</th>
              <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quality Grade</th>
              <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Foreign Matter %</th>
              <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
            </tr>
          </thead>
          <tbody id="table-body" class="bg-white divide-y divide-gray-200">
            <tr>
              <td colspan="7" class="px-3 sm:px-6 py-8 sm:py-12 text-center text-gray-500 text-sm">No historical data available</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
        <div class="text-sm text-gray-600">
          Showing <span id="showing-from">0</span> to <span id="showing-to">0</span> of <span id="total-records">0</span> records
        </div>

        <div class="flex items-center gap-2">
          <button id="prev-page" class="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium" disabled>
            Previous
          </button>

          <div id="page-numbers" class="flex items-center gap-1">
          </div>

          <button id="next-page" class="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium" disabled>
            Next
          </button>
        </div>

        <select id="per-page" class="px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm">
          <option value="5">5 per page</option>
          <option value="10" selected>10 per page</option>
          <option value="25">25 per page</option>
          <option value="50">50 per page</option>
        </select>
      </div>
    </div>


 


</x-layout>