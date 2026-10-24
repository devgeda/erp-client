// shadcn/ui.
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/shared/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/shared/components/ui/collapsible';

// lucid-react.
import { ChevronRight } from 'lucide-react';

import { useAppLayout } from '@/shared/hooks/useAppLayout';

export function LayoutSidebar() {
  const { ...menu } = useAppLayout();
  return (
    <Sidebar collapsible={'icon'}>
      <SidebarHeader />
      <SidebarContent>
        {menu.navbar.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items?.map((item) => (
                  <Collapsible
                    key={item.title}
                    asChild
                    defaultOpen={item.isActive}
                    className={'group/collapsible'}
                  >
                    <SidebarMenuItem key={item.title}>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          isActive={item.isActive}
                          tooltip={item.title}
                        >
                          {item.icon && <item.icon />}
                          <span>Produtos</span>
                          <ChevronRight
                            className={
                              'ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90'
                            }
                          />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.subItems?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={subItem.isActive}
                              >
                                <a href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
