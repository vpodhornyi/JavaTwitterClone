export const getMessageData = state => {
  if (state) {
    const data = JSON.parse(JSON.stringify(state.message));
    const isChatSelected = data.activeId !== -1;

    return {
      isNavigationLoading: data.navigationLoading,
      isDetailLoading: data.detailLoading,
      users: data.users,
      user: isChatSelected ? data.users[data.activeId] : {},
      activeId: data.activeId,
      isChatSelected,
      isChatInfo: data.isChatInfo,
      message: data.message,
    }
  }
}
