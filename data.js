// Data loading and state management
window.appState = {
  colleges: [],
  selectedCollege: null,
  shortlist: [],
  compareList: [],
  
  async loadColleges() {
    try {
      const response = await fetch('/api/colleges');
      if (!response.ok) throw new Error('Failed to fetch colleges');
      this.colleges = await response.json();
      return this.colleges;
    } catch (error) {
      console.error('Error loading colleges:', error);
      return [];
    }
  },
  
  async getCollegeDetails(id) {
    try {
      const response = await fetch(`/api/colleges/${id}`);
      if (!response.ok) throw new Error('College not found');
      return await response.json();
    } catch (error) {
      console.error('Error loading college details:', error);
      return null;
    }
  },
  
  addToShortlist(collegeId) {
    if (!this.shortlist.includes(collegeId)) {
      this.shortlist.push(collegeId);
      localStorage.setItem('shortlist', JSON.stringify(this.shortlist));
    }
  },
  
  removeFromShortlist(collegeId) {
    this.shortlist = this.shortlist.filter(id => id !== collegeId);
    localStorage.setItem('shortlist', JSON.stringify(this.shortlist));
  },
  
  isInShortlist(collegeId) {
    return this.shortlist.includes(collegeId);
  },
  
  addToCompare(collegeId) {
    if (!this.compareList.includes(collegeId) && this.compareList.length < 3) {
      this.compareList.push(collegeId);
    }
  },
  
  removeFromCompare(collegeId) {
    this.compareList = this.compareList.filter(id => id !== collegeId);
  },
  
  loadShortlist() {
    const saved = localStorage.getItem('shortlist');
    this.shortlist = saved ? JSON.parse(saved) : [];
  }
};

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
  window.appState.loadShortlist();
});
