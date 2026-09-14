// 100% Offline & Ad-Free YaGames Mock for Time Shooter 2
window.YaGames = {
  init: function (options) {
    console.log("[YaGames Mock] Initialized successfully in offline mode.");
    const mockPlayer = {
      getData: function (keys) {
        try {
          const raw = localStorage.getItem("ts2_player_data");
          if (raw) {
            const parsed = JSON.parse(raw);
            console.log("[YaGames Mock] Loaded player data from localStorage:", parsed);
            return Promise.resolve(parsed);
          }
        } catch (e) {
          console.warn("[YaGames Mock] Could not load from localStorage:", e);
        }
        return Promise.resolve({
          levels: 1,
          sounds: 1,
          music: 1,
          language: 1,
          tutor: 1,
          sensitivity: 5
        });
      },
      setData: function (data) {
        try {
          localStorage.setItem("ts2_player_data", JSON.stringify(data));
          console.log("[YaGames Mock] Saved player data to localStorage:", data);
        } catch (e) {
          console.warn("[YaGames Mock] Could not save to localStorage:", e);
        }
        return Promise.resolve();
      }
    };

    const mockSdk = {
      environment: {
        i18n: {
          lang: "en",
          tld: "com"
        }
      },
      getPlayer: function (opts) {
        return Promise.resolve(mockPlayer);
      },
      adv: {
        showFullscreenAdv: function (callbacks) {
          console.log("[YaGames Mock] Fullscreen ad skipped.");
          if (callbacks && callbacks.callbacks && typeof callbacks.callbacks.onClose === "function") {
            callbacks.callbacks.onClose();
          }
          return Promise.resolve();
        },
        showRewardedVideo: function (callbacks) {
          console.log("[YaGames Mock] Rewarded ad rewarded immediately.");
          if (callbacks && callbacks.callbacks) {
            if (typeof callbacks.callbacks.onRewarded === "function") callbacks.callbacks.onRewarded();
            if (typeof callbacks.callbacks.onClose === "function") callbacks.callbacks.onClose();
          }
          return Promise.resolve();
        }
      }
    };

    return Promise.resolve(mockSdk);
  }
};