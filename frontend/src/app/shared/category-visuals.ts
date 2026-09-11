const categoryIcons: Record<string, string> = {
  music: 'musical-notes-outline',
  sport: 'football-outline',
  workshop: 'construct-outline',
  technology: 'hardware-chip-outline',
  business: 'briefcase-outline',
  conference: 'people-outline',
};

const categoryGradients: Record<string, string> = {
  music: 'linear-gradient(135deg, #ff5a3c, #ff9a3c)',
  sport: 'linear-gradient(135deg, #2d7d9a, #4fc3d9)',
  workshop: 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
  technology: 'linear-gradient(135deg, #1a1a2e, #414169)',
  business: 'linear-gradient(135deg, #1e9e6b, #4ecb96)',
  conference: 'linear-gradient(135deg, #e5484d, #ff8a8f)',
};

export function getCategoryIcon(slug?: string): string {
  return categoryIcons[slug ?? ''] ?? 'pricetag-outline';
}

export function getCategoryGradient(slug?: string): string {
  return categoryGradients[slug ?? ''] ?? 'linear-gradient(135deg, #8a8a94, #b5b5be)';
}