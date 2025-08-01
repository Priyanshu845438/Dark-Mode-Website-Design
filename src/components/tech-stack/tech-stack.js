// Simplified Tech Stack Filtering System
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Initializing Tech Stack Filtering...');
    
    // Wait for tech stack component to load
    const initFiltering = () => {
        const searchInput = document.getElementById('tech-search');
        const filterTabs = document.querySelectorAll('.filter-tab');
        const techCards = document.querySelectorAll('.tech-card');
        
        console.log(`Found ${filterTabs.length} filter tabs and ${techCards.length} tech cards`);
        
        if (!searchInput || filterTabs.length === 0 || techCards.length === 0) {
            console.log('⏳ Waiting for tech stack elements to load...');
            setTimeout(initFiltering, 500);
            return;
        }
        
        let currentFilter = 'all';
        let currentSearch = '';
        
        // Search functionality
        searchInput.addEventListener('input', function(e) {
            currentSearch = e.target.value.toLowerCase().trim();
            console.log('🔍 Search:', currentSearch);
            applyFilters();
        });
        
        // Filter tab functionality
        filterTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active from all tabs
                filterTabs.forEach(t => t.classList.remove('active'));
                // Add active to clicked tab
                this.classList.add('active');
                
                currentFilter = this.dataset.category;
                console.log('🏷️ Filter:', currentFilter);
                applyFilters();
            });
        });
        
        function applyFilters() {
            let visibleCount = 0;
            
            techCards.forEach((card, index) => {
                const category = card.dataset.category;
                const techName = card.dataset.tech || '';
                const cardText = card.textContent.toLowerCase();
                
                // Check category filter
                const categoryMatch = currentFilter === 'all' || category === currentFilter;
                
                // Check search filter
                const searchMatch = !currentSearch || 
                    cardText.includes(currentSearch) ||
                    techName.includes(currentSearch) ||
                    category.includes(currentSearch);
                
                const shouldShow = categoryMatch && searchMatch;
                
                if (shouldShow) {
                    card.style.display = 'flex';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            console.log(`📊 Showing ${visibleCount}/${techCards.length} cards`);
            
            // Show/hide no results message
            updateNoResultsMessage(visibleCount === 0);
        }
        
        function updateNoResultsMessage(show) {
            let noResults = document.querySelector('.no-results-message');
            
            if (show && !noResults) {
                noResults = document.createElement('div');
                noResults.className = 'no-results-message';
                noResults.style.cssText = `
                    grid-column: 1 / -1;
                    text-align: center;
                    padding: 60px 20px;
                    color: rgba(255, 255, 255, 0.6);
                    font-size: 18px;
                `;
                noResults.innerHTML = `
                    <div style="margin-bottom: 16px;">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="opacity: 0.5;">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                        </svg>
                    </div>
                    <h3 style="color: rgba(255, 255, 255, 0.8); margin-bottom: 8px;">No technologies found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                `;
                
                const techGrid = document.getElementById('tech-grid');
                if (techGrid) {
                    techGrid.appendChild(noResults);
                }
            }
            
            if (noResults) {
                noResults.style.display = show ? 'block' : 'none';
            }
        }
        
        // Initial filter application
        applyFilters();
        
        console.log('✅ Tech Stack filtering initialized successfully');
    };
    
    // Start initialization
    initFiltering();
});