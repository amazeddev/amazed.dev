import { useState, useEffect, useCallback } from "react";

interface AnalyticsStats {
  totalViews: number;
  totalPosts: number;
  posts: Array<{
    slug: string;
    totalViews: number;
    langs: Array<{
      lang: string;
      views: number;
    }>;
  }>;
  postsByLanguage: Record<string, number>;
}

export const AnalyticsDashboard: React.FC = () => {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/analytics/stats");
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (loading) {
    return <div className="analytics-loading">Loading analytics...</div>;
  }

  if (!stats) {
    return <div className="analytics-error">Failed to load analytics</div>;
  }

  return (
    <div className="analytics-dashboard">
      <div className="analytics-header">
        <h2>Blog Post Analytics</h2>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Views</h3>
          <div className="stat-number">{stats.totalViews.toLocaleString()}</div>
        </div>

        <div className="stat-card">
          <h3>Total Posts Viewed</h3>
          <div className="stat-number">{stats.totalPosts.toLocaleString()}</div>
        </div>

        <div className="stat-card">
          <h3>Average Views</h3>
          <div className="stat-number">
            {stats.totalPosts > 0
              ? Math.round(stats.totalViews / stats.totalPosts).toLocaleString()
              : "0"}
          </div>
        </div>
      </div>

      <div className="analytics-sections">
        <div className="section">
          <h3>Top Blog Posts</h3>
          <div className="top-posts">
            {stats.posts
              .sort((a, b) => b.totalViews - a.totalViews)
              .map((post, index) => (
                <div key={`${post.slug}`} className="post-item">
                  <div className="post-rank">#{index + 1}</div>
                  <div className="post-info">
                    <div className="post-title">{post.slug}</div>
                    <div className="post-meta">
                      {`${post.totalViews} view(s) • 
                      [${post.langs
                        .map(
                          (lang) => `${lang.lang.toUpperCase()}: ${lang.views}`
                        )
                        .join("; ")}]`}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="section">
          <h3>Views by Language</h3>
          <div className="languages">
            {Object.entries(stats.postsByLanguage).map(([lang, views]) => (
              <div key={lang} className="language-item">
                <span className="language-name">{lang.toUpperCase()}</span>
                <span className="language-count">{views.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
