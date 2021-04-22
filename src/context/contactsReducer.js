import { types } from "./contactsTypes";
import * as R from "ramda";
import { useWith as sWith } from "ramda";

export const contactsReducer = (state, action) => {
  console.log(action);

  const partialEquals = R.ifElse(
    R.is(Object),
    sWith(R.where, [R.mapObjIndexed((x) => partialEquals(x)), R.identity]),
    R.equals
  );

  switch (action.type) {
    case types.changeGoBack:
      return {
        ...state,
        goBack: action.payload,
      };

    case types.addContacts:
      return {
        ...state,
        contacts: [...state.contacts, ...action.payload],
      };

    case types.changeRole:
      return {
        ...state,
        contacts: state.contacts.map((contact) => {
          return contact._id === action.payload.id
            ? { ...contact, role: action.payload.role }
            : contact;
        }),
      };

    case types.addClients:
      return {
        ...state,
        clients: [...state.clients, ...action.payload],
      };

    case types.setActiveContact:
      return {
        ...state,
        activeContact: { ...action.payload },
      };

    case types.setActiveTemplate:
      return {
        ...state,
        activeTemplate: action.payload,
      };

    case types.setActiveTeam:
      return {
        ...state,
        activeTeam: { ...action.payload },
      };

    case types.setActiveFilter:
      return {
        ...state,
        activeFilter: action.payload,
      };

    case types.addTeam:
      return {
        ...state,
        teams: [
          ...state.teams,
          { name: action.payload.name, phone: action.payload.phone },
        ],
        teamsMessages: { ...state.teamsMessages, [action.payload.name]: [] },
      };

    case types.addGroup:
      return {
        ...state,
        groups: [
          ...state.groups,
          {
            name: action.payload.name,
            desc: action.payload.desc,
            contacts: [...action.payload.contacts],
          },
        ],
      };

    case types.addGroup:
      return {
        ...state,
        groups: [
          ...state.groups,
          { name: action.payload.name, phone: action.payload.desc },
        ],
      };

    case types.editGroup:
      return {
        ...state,
        groups: state.groups.map((group, idx) =>
          idx !== action.payload.id
            ? group
            : {
                ...group,
                name: action.payload.name,
                desc: action.payload.desc,
              }
        ),
      };

    case types.removeGroup:
      return {
        ...state,
        groups: state.groups.filter((_, idx) => idx !== action.payload),
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

    case types.addTemplate:
      return {
        ...state,
        templates: [
          ...state.templates,
          { name: action.payload.name, message: action.payload.message },
        ],
      };

    case types.removeMessage:
      return {
        ...state,
        contacts: state.contacts.map((contact) => {
          return contact._id === state.activeContact._id
            ? {
                ...contact,
                messages: contact.messages.filter(
                  (message) => !partialEquals(message, action.payload)
                ),
              }
            : contact;
        }),
        activeContact: {
          ...state.activeContact,
          messages: state.activeContact.messages.filter(
            (message) => !partialEquals(message, action.payload)
          ),
        },
      };

    case types.addTeamsMessage:
      return {
        ...state,
        teamsMessages: {
          ...state.teamsMessages,
          [action.payload.team]: [
            ...state.teamsMessages[action.payload.team],
            action.payload.message,
          ],
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
      return {
        ...state,
        contacts: state.contacts.map((contact) => {
          return contact._id === action.payload.id
            ? {
                ...contact,
                teams: contact.teams.filter((team) => {
                  return team.name !== action.payload.team;
                }),
              }
            : contact;
        }),
      };

    default:
      return state;
  }
};
