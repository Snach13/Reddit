import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface Community {
  imageURL: any;
  id: string;
  creatorId: string;
  numberOfMembers: number;
  privateType: "public" | "restricted" | "private";
  createdAt?: Timestamp;
  imageUrl?: string;
}

export interface CommunitySnippet {
  communityId: string;
  isModerator?: boolean;
  imageURL?: string;
}

export interface CommunityState {
  mySnippets: CommunitySnippet[];
  currentCommunity?: Community;
  snippetFetched: boolean;
}

// export const defaultCommunity: Community = {
//   id: "",
//   creatorId: "",
//   numberOfMembers: 0,
//   privacyType: "public",
// };

export const defaultCommunityState: CommunityState = {
  mySnippets: [],
  snippetFetched: false,
  // initSnippetsFetched: false,
  // visitedCommunities: {},
  // currentCommunity: defaultCommunity,
};

export const communityState = atom<CommunityState>({
  key: "communitiesState",
  default: defaultCommunityState,
});
