import { types } from "./contactsTypes";

export const contactsReducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case types.addContacts:
      return {
        ...state,
        contacts: [...state.contacts, ...action.payload],
      };

    case types.setActiveContact:
      return {
        ...state,
        activeContact: { ...action.payload },
      };

    case types.setActiveTeam:
      return {
        ...state,
        activeTeam: action.payload,
      };

    case types.setActiveFilter:
      return {
        ...state,
        activeFilter: action.payload,
      };

    case types.addTeam:
      return {
        ...state,
        teams: [...state.teams, action.payload],
      };

    case types.addMessage:
      return {
        ...state,
        contacts: state.contacts.map((contact) => {
          return contact._id === state.activeContact._id
            ? {
                ...contact,
                messages: [...contact.messages, action.payload],
              }
            : contact;
        }),
        activeContact: {
          ...state.activeContact,
          messages: [...state.activeContact.messages, action.payload],
        },
      };

    case types.addNote:
      return {
        ...state,
        contacts: state.contacts.map((contact) => {
          return contact._id === state.activeContact._id
            ? {
                ...contact,
                notes: [...contact.notes, action.payload],
              }
            : contact;
        }),
        activeContact: {
          ...state.activeContact,
          notes: [...state.activeContact.notes, action.payload],
        },
      };

    case types.editNote:
      const { idx, note } = action.payload;

      return {
        ...state,
        contacts: state.contacts.map((contact) => {
          return contact._id === state.activeContact._id
            ? {
                ...contact,
                notes: contact.notes.map((noteContent, id) =>
                  idx === id ? note : noteContent
                ),
              }
            : contact;
        }),
        activeContact: {
          ...state.activeContact,
          notes: state.activeContact.notes.map((noteContent, id) =>
            idx === id ? note : noteContent
          ),
        },
      };

    case types.deleteNote:
      return {
        ...state,
        contacts: state.contacts.map((contact) => {
          return contact._id === state.activeContact._id
            ? {
                ...contact,
                notes: contact.notes.filter((_, id) => action.payload !== id),
              }
            : contact;
        }),
        activeContact: {
          ...state.activeContact,
          notes: state.activeContact.notes.filter(
            (_, id) => action.payload !== id
          ),
        },
      };

    case types.setUnreaded:
      return {
        ...state,
        contacts: state.contacts.map((contact) => {
          return contact._id === state.activeContact._id
            ? {
                ...contact,
                unreaded: 0,
              }
            : contact;
        }),
      };

    case types.updateUnreaded:
      return {
        ...state,
        contacts: state.contacts.map((contact) => {
          return contact._id === action.payload.id
            ? {
                ...contact,
                unreaded: action.payload.value + contact.unreaded,
              }
            : contact;
        }),
      };

    case types.addMultiMessages:
      const { id, message } = action.payload;

      return {
        ...state,
        contacts: state.contacts.map((contact) => {
          return contact._id === id
            ? {
                ...contact,
                messages: [...contact.messages, message],
              }
            : contact;
        }),
      };

    case types.addMultiTeamContacts:
      const { _id, teams } = action.payload;

      return {
        ...state,
        contacts: state.contacts.map((contact) => {
          return contact._id === _id
            ? {
                ...contact,
                teams: [...contact.teams, ...teams],
              }
            : contact;
        }),
      };

    case types.removeMultiTeamContacts:
      console.log(action.payload);
      return {
        ...state,
        contacts: state.contacts.map((contact) => {
          return contact._id === action.payload.id
            ? {
                ...contact,
                teams: contact.teams.filter((team) => {
                  console.log({ team, other: action.payload.team });
                  return team !== action.payload.team;
                }),
              }
            : contact;
        }),
      };

    default:
      return state;
  }
};
