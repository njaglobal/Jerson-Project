<x-layout>
     <div class="mb-6 sm:mb-8">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">New Copra Quality Test</h1>
      <p class="text-sm sm:text-base text-gray-600">Record a new copra quality assessment</p>
    </div>

    <div class="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6 lg:p-8">
      <form id="test-form" class="space-y-4 sm:space-y-6">
        <div class="grid sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label for="moisture-content" class="block text-sm font-medium text-gray-700 mb-2">
              Moisture Content (%)
              <span class="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="moisture-content"
              name="moisture-content"
              required
              min="0"
              max="100"
              step="0.01"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
              placeholder="e.g., 6.5"
            >
            <p class="mt-1 text-xs text-gray-500">Standard range: 6-8% for high quality</p>
          </div>

          <div>
            <label for="weight" class="block text-sm font-medium text-gray-700 mb-2">
              Weight (kg)
              <span class="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              required
              min="0.01"
              step="0.01"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
              placeholder="e.g., 50.25"
            >
          </div>

          <div>
            <label for="oil-content" class="block text-sm font-medium text-gray-700 mb-2">
              Oil Content (%)
            </label>
            <input
              type="number"
              id="oil-content"
              name="oil-content"
              min="0"
              max="100"
              step="0.01"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
              placeholder="e.g., 65.0"
            >
            <p class="mt-1 text-xs text-gray-500">Typical range: 60-70%</p>
          </div>

          <div>
            <label for="foreign-matter" class="block text-sm font-medium text-gray-700 mb-2">
              Foreign Matter (%)
            </label>
            <input
              type="number"
              id="foreign-matter"
              name="foreign-matter"
              min="0"
              max="100"
              step="0.01"
              value="0"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
              placeholder="e.g., 1.5"
            >
            <p class="mt-1 text-xs text-gray-500">Lower is better, typically &lt;3%</p>
          </div>
        </div>

        <div>
          <label for="quality-grade" class="block text-sm font-medium text-gray-700 mb-2">
            Quality Grade
            <span class="text-red-500">*</span>
          </label>
          <select
            id="quality-grade"
            name="quality-grade"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
          >
            <option value="">Select grade...</option>
            <option value="A">Grade A - Premium Quality</option>
            <option value="B">Grade B - Good Quality</option>
            <option value="C">Grade C - Standard Quality</option>
            <option value="D">Grade D - Fair Quality</option>
            <option value="Rejected">Rejected - Below Standards</option>
            <option value="Pending">Pending - Under Review</option>
          </select>
        </div>

        <div>
          <label for="test-date" class="block text-sm font-medium text-gray-700 mb-2">
            Test Date & Time
            <span class="text-red-500">*</span>
          </label>
          <input
            type="datetime-local"
            id="test-date"
            name="test-date"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
          >
        </div>

        <div>
          <label for="notes" class="block text-sm font-medium text-gray-700 mb-2">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            rows="4"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition resize-none"
            placeholder="Additional observations, sample source, weather conditions, etc."
          ></textarea>
        </div>

        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 class="font-semibold text-blue-900 mb-2">Quality Assessment Guidelines</h3>
          <ul class="text-sm text-blue-800 space-y-1">
            <li><span class="font-medium">Grade A:</span> Moisture 6-7%, Oil content 65-70%, Foreign matter &lt;2%</li>
            <li><span class="font-medium">Grade B:</span> Moisture 7-8%, Oil content 60-65%, Foreign matter &lt;3%</li>
            <li><span class="font-medium">Grade C:</span> Moisture 8-10%, Oil content 55-60%, Foreign matter &lt;5%</li>
            <li><span class="font-medium">Grade D:</span> Moisture 10-12%, Oil content 50-55%, Foreign matter &lt;7%</li>
          </ul>
        </div>

        <div id="error-message" class="hidden bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"></div>
        <div id="success-message" class="hidden bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm"></div>

        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            type="submit"
            class="flex-1 bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 font-semibold transition shadow-lg text-sm sm:text-base"
          >
            Save Test Result
          </button>
          <a
            href="{{ route('dashboard') }}"
            class="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 font-semibold transition text-center text-sm sm:text-base"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>

    <div class="mt-6 sm:mt-8 bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6">
      <h2 class="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Testing Tips</h2>
      <div class="grid sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <h3 class="font-semibold text-gray-900 mb-2">Moisture Testing</h3>
          <ul class="text-sm text-gray-600 space-y-1">
            <li>• Use calibrated moisture meter for accurate readings</li>
            <li>• Take multiple samples from different locations</li>
            <li>• Test at consistent temperature conditions</li>
            <li>• Record time of day for correlation analysis</li>
          </ul>
        </div>
        <div>
          <h3 class="font-semibold text-gray-900 mb-2">Sample Preparation</h3>
          <ul class="text-sm text-gray-600 space-y-1">
            <li>• Ensure representative sample from batch</li>
            <li>• Clean equipment before each test</li>
            <li>• Remove visible contaminants manually</li>
            <li>• Document sample source and batch number</li>
          </ul>
        </div>
      </div>
    </div>

</x-layout>